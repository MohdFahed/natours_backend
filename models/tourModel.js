const mongoose = require('mongoose')
const tourSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,'A tour must have name'],
    unique:true,
    trim:true
  },
  duration:{
    type:Number,
    required:[true,"A tour must have duration"]
  },
  maxGroupSize:{
    type:Number,
    required:[true,"A tour must have maxGroupSize"]
  },
  difficulty:{
    type:String,
    required:[true,"A tour must have defficulty"]
  },
  ratingAverage:{
    type:Number,
    default:4.5
  },
  ratingQuantity:{
    type:Number,
    default:0
  },
  price:{
    type:Number,
    required:[true, 'A tour must have price']
  },
  priceDiscount:Number,
  summary:{
    type:String,
    trim:true,
    required:[true,"A tour must have summary"]
  },
  description:{
    type:String,
    trim:true
  },
  imageCover:{
    type:String,
    required:[true,"A tour must have imageCover"]
  },
  images:[String],
  createdAt:{
    type:Date,
    default:Date.now(),
    select:false
  },
  startDates:[Date]
  
})


const Tour = mongoose.model('Tour',tourSchema);
module.exports = Tour;