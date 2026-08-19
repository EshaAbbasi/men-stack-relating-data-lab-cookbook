const User = require('../models/user');
const Recipe = require('../models/recipe');

const index = async (req, res) => {
  try {
    const users = await User.find({});
    res.render('users/index.ejs', { users });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
};

const show = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const recipes = await Recipe.find({ owner: req.params.id });
    res.render('users/show.ejs', { user, recipes });
  } catch (err) {
    console.log(err);
    res.redirect('/users');
  }
};

module.exports = { index, show };