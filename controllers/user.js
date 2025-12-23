   const User=require("../model/user")

module.exports.renderSignup=(req , res )=>{
    res.render("users/signup.ejs")
 }


module.exports.signup=(async(req , res , next)=>{
    try{
           let{username , email , password}=req.body;
    const newUser=new User({email , username});
    const resgisterUser=await User.register(newUser , password)
    
    req.login(resgisterUser , (err)=>{
      if(err){
         return next(err)
      }
       req.flash("success", "User was registered succesfully");
    req.session.save(()=>{
       res.redirect("/listings")
    });
    })
    
    }
   catch(e){
    req.flash("error" , e.message)
    res.redirect("/signup")
   }



})


module.exports.loginform=(req , res)=>{
    res.render("users/login.ejs")
}

module.exports.login=async (req , res)=>{
   req.flash("success" , "Welcome to Wonderlust! ,  you are logged in! ")
   res.redirect("/listings")
}

module.exports.logout=(req , res)=>{
   req.logOut((err)=>{
      if(err){
         return next(err);

      }
      req.flash("success" , "you are logged out!");
      res.redirect("/listings");

   })
}