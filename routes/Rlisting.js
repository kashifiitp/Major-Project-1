
const express=require('express');
const router=express.Router({mergeParams:true});
const WrapAsync=require("../utlis/wrapasync.js");
const ExpressError=require("../utlis/ExpressError.js");
const {listingSchema } = require('../schema.js');
const listing=require("../model/listing.js");
const {isLoggedIn}=require("../middleware.js");
const {isOwner}=require("../middleware.js");
const wrapasync = require('../utlis/wrapasync.js');
const listingcont = require("../controllers/listing.js")
const multer  = require('multer')
const {storage}=require('../cloudConfig.js')
const upload = multer({ storage });



  

 const validation=(req,  res , next)=>{
 
     let {error} = listingSchema.validate(req.body);
     
  if(error){
       let errmsg=error.details.map((el)=>el.message).join(",")
        return next( new ExpressError(400 ,errmsg));
        } 
     else{
           next();

         }
   }


router.route("/")
.get(wrapasync(listingcont.index) 
 )
 .post(isLoggedIn , upload.single('listings[image]'),validation,WrapAsync(listingcont.createListing))


 
//  new Route
   router.get("/new",isLoggedIn, listingcont.renderNewForm);

 router.route("/:id")
 .get( WrapAsync(listingcont.Showlistings))
 .put( isLoggedIn ,isOwner, upload.single('listings[image]'),validation,  WrapAsync(listingcont.renderUpdate))
 .delete( isLoggedIn,isOwner, WrapAsync(listingcont.renderDelete));


   // EDIT ROUTE

 router.get("/:id/edit" ,isLoggedIn,isOwner, WrapAsync(listingcont.renderEditForm))



 module.exports=router;