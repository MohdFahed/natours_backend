const express = require('express');
const app = express();
app.get('/',(req, res)=>{
 res.status(200).json({
  message:"Success"
 })
})

app.post('/',(req,res)=>{
  res.status(200).json({
    message:"Data coming from post API.."
  })
})
const port =3000;
app.listen(port,()=>{
  console.log(`App runing ${port}`)
})