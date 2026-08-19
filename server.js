/* eslint-disable prefer-destructuring */
require('dotenv').config();
require('./config/databse'); 

const express = require('express');
const app = express();


// Middleware
const session = require('express-session');
const MongoStore = require('connect-mongo').MongoStore;
const methodOverride = require('method-override');
const morgan = require('morgan');

const addUserToViews = require('./middleware/addUserToViews');
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

// MODELS 
const User = require('./models/user');
const Recipe = require('./models/recipe');
const Ingredient = require('./models/ingredient');

// CONTROLLERS
const authCtrl = require('./controllers/authCtrl');
const foodCtrl = require('./controllers/foodsCtrl');
const recipes = require('./controllers/recipes.js');
const ingredients = require('./controllers/ingredients.js');

//const usersCtrl = require('./controllers/usersCtrl');

const port = process.env.PORT ? process.env.PORT : '3000';

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
// middleware
app.use(addUserToViews);
app.use(passUserToView);
//app.use('/auth', auth);
app.use(isSignedIn);
//app.use('/recipes', recipes);
//app.use('/ingredients', ingredients);
//app.get('/auth/sign-out', authCtrl.signout);
// PUBLIC ROUTES
app.get('/', async (req, res) => {
  res.render('index.ejs');
});

app.get('/auth/sign-up', authCtrl.signup);
app.post('/auth/sign-up', authCtrl.register);
app.get('/auth/sign-in', authCtrl.signin);
app.post('/auth/sign-in', authCtrl.login);





// COMMUNITY ROUTES — list all users, browse anyone's pantry
//app.get('/users', usersCtrl.index);

//food
app.get('/users/:id/foods', foodCtrl.index);
app.get('/users/:id/foods/new', foodCtrl.new);
app.post('/users/:id/foods', foodCtrl.create);
app.get('/users/:id/foods/:foodId', foodCtrl.show);
app.get('/users/:id/foods/:foodId/edit', foodCtrl.edit);
app.put('/users/:id/foods/:foodId', foodCtrl.update);
app.delete('/users/:id/foods/:foodId', foodCtrl.delete);

//Recipes
app.get('/users/:id/recipes',recipes.index);
app.get('/users/:id/recipes/new',recipes.new);
app.post('/users/:id/recipes', recipes.create);
app.get('/users/:id/recipes/:recipeId', recipes.show);
app.get('/users/:id/recipes/:recipeId/edit', recipes.edit);
app.put('/users/:id/recipes/:recipeId', recipes.update);
app.delete('/users/:id/recipes/:recipeId', recipes.delete);

//ingredients
app.get('/users/:id/ingredients', ingredients.index);
app.post('/users/:id/ingredients', ingredients.create);


app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});