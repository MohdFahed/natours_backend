const mongoose = require('mongoose')
const dotEnv = require('dotenv')
dotEnv.config({path: './config.env'})
const app = require('./app');
console.log(app.get('env'));


/**DB Connection  */
const DB = process.env.DATABASE;
console.log(DB)
mongoose.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false
}).then((con)=>{
  console.log(con.connections)
  console.log("Connction stablished")
})
/**End DB connection */
const port = process.env.PORT || 3000;
app.listen(port,()=>{
  console.log(`App runing ${port}`)
})