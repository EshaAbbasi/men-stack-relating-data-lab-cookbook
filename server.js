require('dotenv').config();
require('./config/database');
const path = require('path');
const express = require('express');

const app = express();

const session = require('express-session');
const MongoStore = require('connect-mongo').MongoStore;
const methodOverride = require('method-override');
const morgan = require('morgan');


const isSignedIn = require('./middleware/isSignedIn');
const addUserToViews = require('./middleware/addUserToViews');

const authCtrl = require('./controllers/authCtrl');
const foodsCtrl = require('./controllers/foodsCtrl');
const ingredientsCtrl = require('./controllers/ingredients');
const recipesCtrl = require('./controllers/recipes');
const usersCtrl = require('./controllers/usersCtrl');

const port = process.env.PORT ? process.env.PORT : '3000';

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
);
app.use(addUserToViews);

// PUBLIC ROUTES
app.get('/', (req, res) => {
  if (req.session.user) {
    return res.redirect('/foods');
  }
  res.render('index.ejs');
});

app.get('/auth/sign-up', authCtrl.signup);
app.post('/auth/sign-up', authCtrl.register);
app.get('/auth/sign-in', authCtrl.signin);
app.post('/auth/sign-in', authCtrl.login);
app.get('/auth/sign-out', authCtrl.signout);

// PROTECTED ROUTES BELOW THIS LINE
app.use(isSignedIn);

app.get('/protected', (req, res) => {
  res.send(`You are logged in as ${req.session.user.username}`);
});

// FOODS (pantry - embedded)
app.get('/foods', foodsCtrl.index);
app.get('/foods/new', foodsCtrl.new);
app.post('/foods', foodsCtrl.create);

// INGREDIENTS
app.get('/foods/ingredients', ingredientsCtrl.index);
app.get('/foods/ingredients/new', ingredientsCtrl.new);
app.post('/foods/ingredients', ingredientsCtrl.create);

app.get('/foods/:id', foodsCtrl.show);
app.get('/foods/:id/edit', foodsCtrl.edit);
app.put('/foods/:id', foodsCtrl.update);
app.delete('/foods/:id', foodsCtrl.delete);

// RECIPES
app.get('/recipes', recipesCtrl.index);
app.get('/recipes/new', recipesCtrl.new);
app.post('/recipes', recipesCtrl.create);
app.get('/recipes/:id', recipesCtrl.show);
app.get('/recipes/:id/edit', recipesCtrl.edit);
app.put('/recipes/:id', recipesCtrl.update);
app.delete('/recipes/:id', recipesCtrl.delete);

// USERS
app.get('/users', usersCtrl.index);
app.get('/users/:id', usersCtrl.show);

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});