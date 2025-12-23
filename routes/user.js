 const express=require('express');
 const router=express.Router({mergeParams:true});
 const User=require("../model/user.js");
const wrapasync = require('../utlis/wrapasync.js');
const passport = require('passport');
const usercontroller=require("../controllers/user.js")


router.route("/signup").get( usercontroller.renderSignup )
.post(wrapasync(usercontroller.signup));

router.route("/login").get( usercontroller.loginform)
.post(passport.authenticate("local" , {failureRedirect: 'login' , failureFlash:true}), usercontroller.login );

router.get("/logout" ,usercontroller.logout);


 module.exports=router;