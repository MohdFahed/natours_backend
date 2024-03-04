const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json())  // medile ware

/**Router Handler */
const getAllTours = (req , res)=>{
  res.status(200).json({
   status:'success',
   result:tours.length,
   data :{
     tours:tours
   }
  })
}
/**Router Handler */
const getTour = (req , res)=>{
  console.log(req.params)
  const id = req.params.id * 1;
  const tour = tours.find(ele=>ele.id === id)
  if(!tour){
   return res.status(404).json({
       status:"fail",
       message:"Invalid Id"
    })
  }
  res.status(200).json({
   status:'success',
   data :{
    tour:tour
   }
  })
}
/**Router Handler */
const createTour = (req,res)=>{
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
const updateTour = (req,res)=>{
  if(req.params.id *1 > tours.length){
    return res.status(404).json({
      status:"fail",
      message:"Invalid Id"
   })
  }
  res.status(200).json({
    status:'success',
     message:"<Update tour here >"
  })
}
/**Router Handler */
const deleteTour = (req,res)=>{
  if(req.params.id *1 > tours.length){
    return res.status(404).json({
      status:"fail",
      message:"Invalid Id"
   })
  }
  res.status(204).json({
    status:'success',
     tour:null
  })
}

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)) 
/*
app.get('/api/v1/tours',getAllTours);
app.post('/api/v1/tours',createTour);
app.get('/api/v1/tours/:id',getTour);
app.patch('/api/v1/tours/:id',updateTour)
app.delete('/api/v1/tours/:id',deleteTour)
*/

/* Bellow code are same as above bellow code is just standerized * */
app.route('/api/v1/tours').get(getAllTours).post(createTour)
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour)
const port =3000;
app.listen(port,()=>{
  console.log(`App runing ${port}`)
})