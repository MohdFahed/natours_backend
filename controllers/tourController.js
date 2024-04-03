const Tour = require('./../models/tourModel')

exports.aliasTopTours = (req,res,next)=>{
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,price';
  req.query.feilds = 'name,price,ratingAverage,summary,difficulty'
 next();
}

class APIFeatures {
  constructor(query, queryStr){
    this.query = query ;
    this.queryStr = queryStr ;
  }
  filter(){
    const queryObj = {...this.queryStr}
    const excludedFeilds = ['page','sort','limit','feilds']
    excludedFeilds.forEach(el => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    this.query =this.query.find(JSON.parse(queryStr))
    return this;  // return entaired Object
  }
  sort(){
    if(this.queryStr.sort){
      const sortBy =this.queryStr.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy)
    }else{
      this.query = this.query.sort('-createdAt');
    }
    return this ; //return entaired Object
  }

  limitfeilds(){
    if(this.queryStr.feilds){
      const fieldsLimit = this.queryStr.feilds.split(',').join(' ');
      this.query = this.query.select(fieldsLimit);
   }else{
     this.query = this.query.select('-__v')
   }
   return this ;
  }

  pagination(){
    const page = this.queryStr.page * 1 || 1 ;
    const limit = this.queryStr.page * 1 || 100 ;
    const skip =(page - 1) * limit ;
    this.query = this.query.skip(skip).limit(limit);
    return this ;
  }
}


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
      message:error
     })
  }
}

/**Read all Tour */
exports.getAllTours =async (req , res)=>{
  try{
  //  const allTour = await Tour.find()
  //  .where('duration').equals(5)
  //  .where('difficulty').equals('easy');
 
  //build Query
  //1A- filtering
  // const queryObj = {...req.query}
  // const excludedFeilds = ['page','sort','limit','feilds']
  // excludedFeilds.forEach(el => delete queryObj[el]);
  
  // //1B-Advance filtering
  // let queryStr = JSON.stringify(queryObj);
  // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
  //  //gte, gt , lte,lt, ->grether then equalto , less then equalto
  // let query =  Tour.find(JSON.parse(queryStr))

  //2- sorting
  // if(req.query.sort){
  //   const sortBy = req.query.sort.split(',').join(' ');
  //     query = query.sort(sortBy)
  // }else{
  //     query = query.sort('-createdAt');
  // }

  //3- fileds limit
  // if(req.query.feilds){
  //    const fieldsLimit = req.query.feilds.split(',').join(' ');
  //    query = query.select(fieldsLimit);
  // }else{
  //   query = query.select('-__v')
  // }

  //4- pagination
  // const page = req.query.page * 1 || 1 ;
  // const limit = req.query.limit * 1 || 100 ;
  // const skip =(page - 1) * limit ;
  // query = query.skip(skip).limit(limit);

  // if(req.query.page){
  //   const numTours = await Tour.countDocuments();
  //   if(skip >= numTours) throw new Error("Page not exists.")
  // }

  //Execute Query
 const  featureObj  = new APIFeatures(Tour.find(),req.query)
 .filter()
 .sort()
 .limitfeilds()
 .pagination();
 const allTour = await featureObj.query;
  //Response Send
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
       message:error
     })
     console.log(error)
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


