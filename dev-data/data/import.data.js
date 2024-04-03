const mongoose = require('mongoose')
const dotEnv = require('dotenv')
dotEnv.config({path: './config.env'})
const fs = require('fs');
const Tour = require('./../../models/tourModel');
const { env } = require('process');
/**DB Connection  */
const DB = process.env.DATABASE;
mongoose.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false
}).then((con)=>{
  console.log("Connction stablished")
})
/**End DB connection */


/**Rad Js File */

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'));
const importData = async () =>{
  try{
   await Tour.create(tours);
   console.log("data successfully loaded")
  }catch(error){
    console.log(error);
  }
}


/*Deleted all doucments*/ 

const deleteallDocuments = async () =>{
  try{
     await Tour.deleteMany();
     console.log("data deleted successfully ")
  }catch(error){
    console.log(error)
  }
}

importData();