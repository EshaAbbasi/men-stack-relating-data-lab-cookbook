const User=require('../models/user');
const Recipe = require('../models/recipe');
const Ingredient=require('../models/ingredient');
const index=async(req,res)=>
{
    try{
        const user=await User.findById(req.params.id);
        res.render('ingredients/index.ejs',{ingredients:user.ingredients})
    }
    catch(err){
        res.redirect('/')
    }
};
const create=async(req,res)=>{
    try{
         const newingredient = new Ingredient(req.body);
    newIngredient.owner = req.session.user._id;
    await newIngredient.save();
        res.redirect('/users/:id/ingredients');

    }
    catch(err){
 console.log(err);
        res.redirect('/users/:id/ingredient/new');

}}

module.exports={
    index,
   
    create,
}