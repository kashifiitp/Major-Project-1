   const listing=require("../model/listing")
   
   module.exports.index=async(req , res)=>{
       const  allListings=await listing.find({});
      res.render("./listings/index.ejs" , {allListings});
 };


 module.exports.renderNewForm=(req , res)=>{
     res.render("./listings/new.ejs")
 }

 module.exports.Showlistings = async (req , res)=>{
       let  {id}=req.params;
          const Listing=  await  listing.findById(id).
          populate(
           {path:"reviews" ,
            populate:{
             path:"author" } ,
           })
             .populate("owner");
        if (!Listing) {
          req.flash("error1" , " Listing you requested  for does not exist ")
           res.redirect("./listings")
        }
        console.log(Listing);
        
          res.render("./listings/show.ejs" , {Listing})
 }

 module.exports.createListing = (async(req , res )=>{
   let url =req.file.path;
   let filename=req.file.filename;
  
   if(req.body.listings.image){
    delete
    req.body.listings.image
   }
   
    const NewListing= new listing(req.body.listings)
       NewListing.owner=req.user._id;
        NewListing.image={url , filename};
      await NewListing.save();
      req.flash("success" , "New Listing Created")
      res.redirect("/listings");
     
  
      })


module.exports.renderEditForm=async(req , res)=>{
      let  {id}=req.params;
        const Listing=  await  listing.findById(id);
          if (!Listing) {  
       req.flash("error", "Listing not found!");
       return  res.redirect("/listings")
          }
          let originalImageUrl=Listing.image.url;
          originalImageUrl.replace("/upload" , "/upload?h_300 , w_250")
        res.render("./listings/edit.ejs" , {Listing ,  originalImageUrl});
 };

 module.exports.renderUpdate= async(req , res)=>{
        let  {id}=req.params;

    let url =req.file.path;
   let filename=req.file.filename;
  
   if(req.body.listings.image){
    delete
    req.body.listings.image
   }
   let Nlisting= await listing.findByIdAndUpdate(id , {...req.body.listings});
   Nlisting.image={url , filename};
      await Nlisting.save();
      req.flash("success" , " Listing is Updated")
    res.redirect(`/listings/${id}`);
 };

 module.exports.renderDelete=async(req , res)=>{
           let  {id}=req.params;
         let Deletetedlisting= await  listing.findByIdAndDelete(id);
         console.log(Deletetedlisting);
               req.flash("success" , "Delete Listing ")
         res.redirect("/listings")
       
 };