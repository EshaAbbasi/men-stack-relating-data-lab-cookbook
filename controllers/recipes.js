const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');

const index = async (req, res) => {
  try {
    const recipes = await Recipe.find({ owner: req.session.user._id });
    res.render('recipes/index.ejs', { recipes });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
};

const newRecipe = async (req, res) => {
  try {
    const ingredients = await Ingredient.find({});
    res.render('recipes/new.ejs', { ingredients });
  } catch (err) {
    console.log(err);
    res.redirect('/recipes');
  }
};

const create = async (req, res) => {
  try {
    req.body.owner = req.session.user._id;
    if (!Array.isArray(req.body.ingredients)) {
      req.body.ingredients = req.body.ingredients ? [req.body.ingredients] : [];
    }
    await Recipe.create(req.body);
    res.redirect('/recipes');
  } catch (err) {
    console.log(err);
    res.redirect('/recipes/new');
  }
};

const show = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('ingredients').populate('owner');
    res.render('recipes/show.ejs', { recipe });
  } catch (err) {
    console.log(err);
    res.redirect('/recipes');
  }
};

const edit = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe.owner.equals(req.session.user._id)) return res.redirect('/recipes');
    const ingredients = await Ingredient.find({});
    res.render('recipes/edit.ejs', { recipe, ingredients });
  } catch (err) {
    console.log(err);
    res.redirect('/recipes');
  }
};

const update = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe.owner.equals(req.session.user._id)) return res.redirect('/recipes');
    if (!Array.isArray(req.body.ingredients)) {
      req.body.ingredients = req.body.ingredients ? [req.body.ingredients] : [];
    }
    await Recipe.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/recipes/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.redirect('/recipes');
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe.owner.equals(req.session.user._id)) {
      await Recipe.findByIdAndDelete(req.params.id);
    }
    res.redirect('/recipes');
  } catch (err) {
    console.log(err);
    res.redirect('/recipes');
  }
};

module.exports = { index, new: newRecipe, create, show, edit, update, delete: deleteRecipe };