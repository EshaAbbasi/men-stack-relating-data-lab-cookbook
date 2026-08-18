const User=require('../models/user');

const index=async(req,res)=>
{
    try{
        const user=await User.findById(req.params.id);
        res.render('foods/index.ejs',{foods:user.foods})
    }
    catch(err){
        res.redirect('/')
    }
};
const newApp=async(req,res)=>
{
    try{
         res.render('foods/new.ejs')}
    catch(err){
        res.redirect('/');


    }
};
const create=async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        user.foods.push(req.body);
        await user.save();
        res.redirect('/users/:id/foods');

    }
    catch(err){
 console.log(err);
        res.redirect('/users/:id/foods/new');

}}

    const show=async(req,res)=>
    {
    try{
        const user= await User.findById(req.params.id);
const food=user.foods.id(req.params.appId);
         res.render('foods/show.ejs',{food})}
    catch(err){
        res.redirect('/');


    }
};
const deleteApp = async(req,res)=>
{
    try{
        const user= await User.findById(req.params.id);
user.foodss.pull(req.params.appId);
await user.save();
res.redirect('/users/${user._id}/foods');}
       
    catch(err){
        res.redirect('/');


    }
};
const edit = async(req,res)=>
{
    try{
        const user= await User.findById(req.params.id);
const food=user.foods.id(req.params.appId);
await user.save();
res.render('foods/edit.ejs',{food});
}
       
    catch(err){
        res.redirect('/');

    }}
const update = async(req,res)=>
{
    try{
        const user= await User.findById(req.params.id);
const food=user.foods.id(req.params.appId);
application.set(req.body);
await user.save();
  res.redirect(`/users/${user._id}/foods/${food._id}`);
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