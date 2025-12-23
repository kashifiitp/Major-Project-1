const listing=require("./model/listing.js");
const Review=require("./model/review.js")
 
 const isLoggedIn= (req , res , next)=>{
      console.log(req.user); 
    if(!req.isAuthenticated()){
       req.flash("error" , "you need to log in");
       return res.redirect("/login")
    
    
    }
    next();

}

const isOwner=async (req , res , next)=>{
  let {id}=req.params;
    let Listing= await listing.findById(id);
    if(!Listing.owner._id.equals(res.locals.currUser._id)){
    req.flash("error" , "you are not the owner this  listing")
     return  res.redirect(`/listings/${id}`);
        }
        next();
}
const isRevievAuthor=async (req , res , next)=>{
  let {id ,reviewId}=req.params;
    let review= await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
    req.flash("error" , "you are not the authoris this review")
     return  res.redirect(`/listings/${id}`);
        }
        next();
}

module.exports={isLoggedIn , isOwner , isRevievAuthor};




