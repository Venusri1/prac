/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const { process } = require('../../config/env/constants');
module.exports = {
    adminuserLogin:async(req,res)=>{
        const {email,password}=req.body;
        //login validation 
       const admin=await Admin.findOne({email:email});
       if(!admin){
          return res.status(400).json({message:'invaild email and password'})
       }
       else{
           const token =await jwt.sign({id:admin.id},process.env.JWT_KEY,{
               expiresIn: '6h' // expires in 6 hours
                });
           console.log(token);
           //update the token 
           const tokenupdate=await Admin.update({id:admin.id}).set({token:token});

       //password validation
           const adminlogin =await Admin.find({email});
           if(adminlogin){
               if (await bcrypt.compare(password, adminlogin[0].password)) {
                   return res.status(200).json({message:'success',token:token})
                 } else {
                   return res.status(400).json({message:'invaild password'})
                 }
           }
       }
    },

    adminuserLogout:async(req,res)=>{
        const id=req.Id;
            const logout=await Admin.update({id:id}).set({token:null}).exec((err)=>{
                if(err){
                  return  res.status(400).json({message:'logout failed'})
                }else{
                  return  res.status(400).json({message:'logout success',logout:logout})
                }
            });
    }

    



};

