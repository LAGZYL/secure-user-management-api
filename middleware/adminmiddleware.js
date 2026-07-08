const User = require("../models/User");

function adminmiddleware(){
if(req.user.role !== "admin"){
    return res.status(401).json({
        message: "admin access only"
    })
}
next()
}
module.exports = adminmiddleware