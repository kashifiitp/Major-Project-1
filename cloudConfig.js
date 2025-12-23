const cloudinary=require('cloudinary').v2;
const {CloudinaryStorage}=require('multer-storage-cloudinary')

cloudinary.config({
    cloud_name:process.env.Cloud_name,
  api_key:process.env.Cloud_APIkey,
 api_secret:process.env.Cloud_ApiSecret
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Wonderlust-dev',
    allowedFormat: ["png" , "jpg" , "jpeg"]
  },
});

module.exports={
    cloudinary,
    storage
}