const User=require('../models/user');
const Recipe = require('../models/recipe');
const Ingredient=require('../models/ingredient');
const index=async(req,res)=>
{
    try{
        const user=await User.findById(req.params.id);
        res.render('recipes/index.ejs',{recipes:user.recipes})
    }
    catch(err){
        res.redirect('/')
    }
};
const newApp=async(req,res)=>
{
    try{
         res.render('recipes/new.ejs')}
    catch(err){
        res.redirect('/');


    }
};
const create=async(req,res)=>{
    try{
         const newRecipe = new Recipe(req.body);
    newRecipe.owner = req.session.user._id;
    await newRecipe.save();
        res.redirect('/users/:id/recipes');

    }
    catch(err){
 console.log(err);
        res.redirect('/users/:id/recipes/new');

}}

    const show=async(req,res)=>
    {
    try{
        const user= await User.findById(req.params.id);
const frecipes=user.recipes.id(req.params.appId);
         res.render('recipes/show.ejs',{recipe})}
    catch(err){
        res.redirect('/');


    }
};
const deleteApp = async(req,res)=>
{
    try{
        const user= await User.findById(req.params.id);
user.recipes.pull(req.params.appId);
await user.save();
res.redirect('/users/${user._id}/recipes');}
       
    catch(err){
        res.redirect('/');


    }
};
const edit = async(req,res)=>
{
    try{
        const user= await User.findById(req.params.id);
const recipe=user.recipes.id(req.params.appId);
await user.save();
res.render('recipes/edit.ejs',{recipes});
}
       
    catch(err){
        res.redirect('/');

    }}
const update = async(req,res)=>
{
    try{
        const user= await User.findById(req.params.id);
const recipe=user.recipes.id(req.params.appId);
application.set(req.body);
await user.save();
  res.redirect(`/users/${user._id}/recipes/${recipe._id}`);
}
       
    catch(err){
        res.redirect('/');


    }
};


module.exports={
    index,
    new:newApp,
    create,
    show,
    delete:deleteApp,
edit,
update
}