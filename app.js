require("dotenv").config();
const router = require("./routes/userRoute.js")
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json()); 
app.use("/",router);
const errorMiddleware = require("../middleware/errormiddleware.js");
app.use(errorMiddleware);
async function startServer() {
    try{
 await mongoose.connect("mongodb://127.0.0.1:27017/studentDB"); 
    console.log("connected to mongoDB");
    

 app.listen(3000,()=>{
    console.log("server conected") })
    }catch(e){ 
       console.log(e.message)
    };   
 
};

startServer();

