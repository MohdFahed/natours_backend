const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

/**checkID Meddileware */
exports.checkID = (req,res,next,value)=>{
  console.log(`value from params middleware ${value}`)
  if(req.params.id *1 > tours.length){
    return res.status(404).json({
      status:"fail",
      message:"Invalid Id"
   })
  }
  next();
}

exports.checkBody = (req,res,next)=>{
  console.log(`value from params middleware ${req.body.name}`)
  if(!req.body.name || !req.body.price){
    return res.status(404).json({
      status:'fail',
      message:"missing name and price.."
    })
  }
  console.log("Fahad..")
  next();
}

exports.getAllTours = (req , res)=>{
  // console.log(req.requestTime)
  res.status(200).json({
   status:'success',
   requestedAt:req.requestTime,
   result:tours.length,
   data :{
     tours:tours
   }
  })
}
/**Router Handler */
exports.getTour = (req , res)=>{
  console.log(req.params)
  const id = req.params.id * 1;
  const tour = tours.find(ele=>ele.id === id)
  res.status(200).json({
   status:'success',
   data :{
    tour:tour
   }
  })
}
/**Router Handler */
exports.createTour = (req,res)=>{
  const newTourId = tours[tours.length -1].id + 1 ;
  const newTour = Object.assign({id:newTourId},req.body);
  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),(err) =>{
    res.status(201).json({
      message:"success",
      data:{
       tour:newTour
      }
    })
  })
}
/**Router Handler */
exports.updateTour = (req,res)=>{
  res.status(200).json({
    status:'success',
     message:"<Update tour here >"
  })
}
/**Router Handler */
exports.deleteTour = (req,res)=>{
  res.status(204).json({
    status:'success',
     tour:null
  })
}


