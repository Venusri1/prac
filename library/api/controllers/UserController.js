/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 const jwt=require('jsonwebtoken');
 const bcrypt=require('bcrypt');
 const { process } = require('../../config/env/constants');
module.exports = {

    signUp:async(req,res)=>{
        const {email,password}=req.body;
        const users =await User.find({email:email});
        const emailformat=/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        const emails=emailformat.test(email)
        //email validation
        if(users.length != 0){
            return res.status(400).json({message:'email was exists'})
        }
        else{
            if(!emails){
                console.log(emails );
                return res.status(400).json({message:'Email format was incorrect'});
            }
            if(password.length != 8){
                console.log(password.length);
                return res.status(400).json({message:'incorrect'});
            }
            else{
                const user= await User.create({email,password}).fetch();
                if(user){
                   return res.status(201).json({message:'success'})
                }
                else{
                   return res.status(404).json({message:'failed to signup'})
                }
            }
        }
    },

    logIn:async(req,res)=>{
        const {email,password}=req.body;
        //login validation 
       const user=await User.findOne({email:email});
       if(!user){
          return res.status(400).json({message:'invaild email and password'})
       }
       else{
           const token =await jwt.sign({id:user.id},process.env.JWT_KEY,{
               expiresIn: '6h' // expires in 6 hours
                });
           console.log(token);
           //update the token 
           const tokenupdate=await User.update({id:user.id}).set({token:token});

       //password validation
           const userlogin =await User.find({email});
           if(userlogin){
               if (await bcrypt.compare(password, userlogin[0].password)) {
                   return res.status(200).json({message:'success',token:token})
                 } else {
                   return res.status(400).json({message:'invaild password'})
                 }
           }
       }
    },
    logOut:async(req,res)=>{
        const id=req.Id;
        console.log(id);
            const logout=await User.update({id:id}).set({token:null}).exec((err)=>{
                if(err){
                  return  res.status(400).json({message:'logout failed'})
                }else{
                  return  res.status(400).json({message:'logout success',logout:logout})
                }
            });
    }
  

};

