
const authmiddleware = require("../middleware/authmiddleware.js")
const express = require("express");
const  router = express.Router()

const {registerUsers, loginUser,  getUsers, 
      getUserId, updateUser, deleteUser
      } = require("../controllers/userController.js")


    router.post("/register", registerUsers)
    router.post("/login", loginUser)
    router.get("/users", authmiddleware, getUsers)
    router.get("/users/:id",authmiddleware, getUserId)
    router.put("/users/:id", authmiddleware, updateUser)
    router.delete("/users/:id",authmiddleware, deleteUser)
   
module.exports = router;