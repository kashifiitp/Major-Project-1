const express=require('express');
 const router=express.Router({mergeParams:true});
  const wrapAsync=require("../utlis/wrapasync.js");
const ExpressError=require("../utlis/ExpressError.js");
const { reviewSchema} = require('../schema.js');
const  Review=require("../model/review.js");
const listing=require("../model/listing.js")
const {isLoggedIn}=require("../middleware.js")
const{isRevievAuthor}=require("../middleware.js")

const validatereview=(res , req , next)=>{
   let {error} =reviewSchema.validate(req.body);
     
     if(error){
        let errmsg=error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400 ,errmsg);
     } 
     else{
        next();
     }
}


const reviewController = require("../controllers/review.js")

 //review
router.post("/" ,isLoggedIn,validatereview,wrapAsync(reviewController.createReview));
 
 //Delete Review
 
router.delete("/:reviewId" ,isLoggedIn ,isRevievAuthor ,wrapAsync(reviewController.dltReview))
 ;

 module.exports=router;