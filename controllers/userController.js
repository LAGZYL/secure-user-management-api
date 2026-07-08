
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const User = require("../models/User.js");

const registerUsers = async (req,res)=>{
     try{
         if(!req.body.name || !req.body.email || !req.body.phoneNumber 
         || !req.body.password){
            return res.status(400).json({
               message: "all field are required"
            })
         }
         if(req.body.password.length < 8){
            return res.status(400).json({
            message: "password must be at least 8 characters"
            })
         }
         if(!req.body.email.includes("@")){
            return res.status(400).json({
               message: "email must be valid"
            })
         }
         const existUser = await User.findOne({
         email : req.body.email
         })
          if(existUser){
         return res.status(400).json({
         message: "email already exist"
      })
    }
      const hashedPassword =  await bcrypt.hash(req.body.password,10)
      const user = await User.create({
         name: req.body.name,
         email: req.body.email,
         phoneNumber: req.body.phoneNumber,
         password: hashedPassword
      })
      return res.status(201).json({
         message: "user created succesfully",
         user: {
         id: user._id,
         name: user.name,
         email: user.email,
         phoneNumber: user.phoneNumber
         }
      })
   }catch(error){
      next(error);
   }
    };
     const loginUser = async(req,res)=>{
      try{
      const user =await User.findOne({
       email: req.body.email
      })
      if(!user){
         return res.status(404).json({
             message: "user not found"
         })
      }
      const isPasswordCorrect = await bcrypt.compare(
         req.body.password,
         user.password
      )
      if(!isPasswordCorrect){
         return res.status(401).json({
            message: "invalid password"
         })
      }
      const token = jwt.sign(
         {id: user._id,
          role: user.role
         },
         process.env.JWT_SECRET,
         {expiresIn: "1hr"}
      )
      return res.status(200).json({
         message: "login successful",
         token 
          
      })
   }catch(error){
      next(error);
   }
    };
     
    const getUsers =  async(req,res)=>{
      try{
    const users = await User.find().select("-password")
    return res.status(200).json({
      message: "users retrieved successfully",
      users: users
    })
   }catch(error){
      next(error);     
   }
    }
    const getUserId = async (req,res)=>{
      try{
      const user = await User.findById(req.params.id).select("-password");
      if(!user){
      return res.status(404).json({
         message: "user does not exist",
         user: user
      })
     }
     return res.status(200).json({
      message: "user retrieved successfully",
      user: user
    });
    }catch(error){
      next(error);
    }
    };

    const updateUser = async (req,res)=>{
      try{
      if(req.body.password){
       req.body.password =  await bcrypt.hash(req.body.password,10)

      }
      const user =await User.findByIdAndUpdate(
         req.params.id,
         req.body,
         {returnDocument: "after"} // thsi show the new document updated 
      ).select("-password");
      if(!user){
         return res.status(404).json({
            message: "user not found",
            
         })
      }
      return res.status(200).json({
        message: "user updated succesfully", 
        user:user
      })
   }catch(error){
     next(error);
   }
    }
      const deleteUser = async (req,res)=>{
      try{
      const user = await User.findByIdAndDelete(req.params.id);
      if(!user){
      return res.status(404).json({
       message:"user not found"
      })  
      };
      return res.status(200).json({
         message: "user deleted succesfully"
      })
      }catch(error){
        next(error);     }
   };
   
module.exports = {registerUsers, loginUser,  getUsers, 
                 getUserId, updateUser, deleteUser
                 }
                 