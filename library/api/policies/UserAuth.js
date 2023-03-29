const jwt=require('jsonwebtoken');
const { process } = require('../../config/env/constants');


//Authenation routes using token 
module.exports= async(req,res,next)=>{
  try {
    //token validation
    const token =req.headers.authorization.split(" ")[1];
    console.log("token",token);
    const user=await User.findOne({token:token});
    if(!user){
        return res.status(401).json({message:'Auth failed'});
    }
    const validation = jwt.verify(token,process.env.JWT_KEY);
     console.log("validation id",validation.id);
     req.userId=validation.id;
    //  req.userId=validation.id;
     console.log("userid",req.userId);
    return next();
  } catch(error) {
    return res.status(401).json({message:'Auth failed'});
  }



};

