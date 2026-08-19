const User = require('../models/user');

const index = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    res.render('foods/index.ejs', { pantry: user.pantry });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
};

const newFood = async (req, res) => {
  res.render('foods/new.ejs');
};

const create = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    user.pantry.push(req.body);
    await user.save();
    res.redirect('/foods');
  } catch (err) {
    console.log(err);
    res.redirect('/foods');
  }
};

const show = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const food = user.pantry.id(req.params.id);
    res.render('foods/show.ejs', { food });
  } catch (err) {
    console.log(err);
    res.redirect('/foods');
  }
};

const edit = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const food = user.pantry.id(req.params.id);
    res.render('foods/edit.ejs', { food });
  } catch (err) {
    console.log(err);
    res.redirect('/foods');
  }
};

const update = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    const food = user.pantry.id(req.params.id);
    food.name = req.body.name;
    await user.save();
    res.redirect(`/foods/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.redirect('/foods');
  }
};

const deleteFood = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    user.pantry.id(req.params.id).deleteOne();
    await user.save();
    res.redirect('/foods');
  } catch (err) {
    console.log(err);
    res.redirect('/foods');
  }
};

module.exports = { index, new: newFood, create, show, edit, update, delete: deleteFood };