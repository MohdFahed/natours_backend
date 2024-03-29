const express = require('express');
const morgan = require('morgan')
const app = express();

/**Cutom Route imports here */
const tourRoute = require('./routes/tourRoute')
const userRoute = require('./routes/userRoute')
/* End * */

/**Middleware */
app.use(express.json())  // medile ware
app.use(express.static(`${__dirname}/public`)) ;   // middleware for serving static page and images


if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))   // middleware for  request logger
}
app.use((req,res,next)=>{
 console.log("Hi I am from middleware....");
 next();
})
app.use((req,res,next)=>{
  req.requestTime = new Date().toISOString();
  next();
 })
 
app.use('/api/v1/users',userRoute)
app.use('/api/v1/tours',tourRoute)

module.exports = app ;