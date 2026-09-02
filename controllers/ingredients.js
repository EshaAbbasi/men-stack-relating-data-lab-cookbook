const Ingredient = require('../models/ingredient');

const index = async (req, res) => {
  try {
    const ingredients = await Ingredient.find({});
    res.render('ingredients/index.ejs', { ingredients });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
};

const newIngredient = async (req, res) => {
  res.render('ingredients/new.ejs');
};

const create = async (req, res) => {
  try {
    await Ingredient.create(req.body);
    res.redirect('/foods/ingredients');
  } catch (err) {
    console.log(err);
    res.redirect('/foods/ingredients/new');
  }
};

module.exports = { index, new: newIngredient, create };