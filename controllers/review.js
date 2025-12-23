const listing = require("../model/listing");
const Review=require("../model/review");


module.exports.createReview=(async (req ,res )=>{
     let listin=await listing.findById(req.params.id)
     let newReview=new Review(req.body.review)
     newReview.author=req.user._id;
     console.log(newReview);
     
     listin.reviews.push(newReview)
      await newReview.save();
      await listin.save();
      console.log("new review saved");
               req.flash("success" , "New Review Created")
      res.redirect(`/listings/${listin._id}`)
      
 })

 module.exports.dltReview=(async(req , res)=>
    {
      
    let{id  , reviewId}=req.params;
    await listing.findByIdAndUpdate(id , {$pull:{reviews:reviewId}});
   await Review.findByIdAndDelete(reviewId);
            req.flash("success" , "review Deleted")
    res.redirect(`/listings/${id}`);
 
   
   
 
 })