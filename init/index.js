const mongoose=require("mongoose");
const initdata=require("./data.js");
const listing=require("../model/listing.js")

const MONGOURL='mongodb://127.0.0.1:27017/wonderlust';

main().then((res)=>{
    console.log("connection is succsesfully");
    
}

).catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGOURL);
}


const initDB=async ()=> {
    await listing.deleteMany({});
    initdata.data= initdata.data.map((obj)=>({...obj  , owner:"68e117d6af17fc7da99abe5f"}))
    await listing.insertMany(initdata.data);
    console.log("data was inintil");
}

initDB();