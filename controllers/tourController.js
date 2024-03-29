const Tour = require('./../models/tourModel')
/**Create Tour*/
exports.createTour = async (req,res)=>{
  try{
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status:'success',
      data:{
        tour:newTour
      }
    })
  }catch(error){
     res.status(400).json({
      status:'fail',
      message:"Invalid data sent"
     })
  }
}

/**Read all Tour */
exports.getAllTours =async (req , res)=>{
  try{
   const allTour = await Tour.find();
   res.status(200).json({
     status:"success",
     results:allTour.length,
     data:{
       tour:allTour
     }
   })
  }catch(error){
     res.status(400).json({
       status:"fail",
       message:"invalid data sent"
     })
  }
}
/**get tour by id */
exports.getTour = async(req , res)=>{
  try{
   const id =req.params.id;
   const tour = await Tour.findById(id);
   res.status(201).json({
    status:"success",
    data:{
      tour:tour
    }
   })
  }catch(error){
    res.status(404).json({
      status:"fail",
      message:"invalid data"
    })
  }
}
/*Update Tour*/
exports.updateTour = async(req,res)=>{
  try{
   const tour = await Tour.findByIdAndUpdate(req.params.id,req.body,
                { 
                  new:true,
                  runValidators:true
                });
   res.status(200).json({
    status:"success",
    data:{
      tour:tour
    }
   })
  }catch(error){
    res.status(404).json({
      status:"fail",
      message:"invalid data"
    })
  }
}

/**delete Tour */
exports.deleteTour = async(req,res)=>{
  try{
   await Tour.findByIdAndDelete(req.params.id);
   res.status(204).json({
    status:"success",
    data:null
   })
  }catch(error){
    res.status(404).json({
      status:"fail",
      message:"invalid data"
    })
  }
}


