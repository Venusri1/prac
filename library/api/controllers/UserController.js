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
 //signup for user
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
            //email format validation
            if(!emails){
                console.log(emails );
                return res.status(400).json({message:'Email format was incorrect'});
            }
            //password validation
            if(password.length != 8){
                console.log(password.length);
                return res.status(400).json({message:'password should have minimum 8 letters'});
            }
            else{
                //creating new user
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
// login for user
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
    //logout for user
    logOut:async(req,res)=>{
        const id=req.userId;
        console.log(id);
        //token validation for logout 
        const token =req.headers.authorization.split(" ")[1];
        console.log(token);
        const user=await User.findOne({id:id,token:token})
        if(!user){
            return  res.status(400).json({message:'Auth failed'})
        }else{
            const logout=await User.update({id:id}).set({token:null}).exec((err)=>{
                if(err){
                  return  res.status(400).json({message:'logout failed'})
                }else{
                  return  res.status(400).json({message:'logout success',logout:logout})
                }
            });

        }
    },
//user can see available of the books
    user:async(req,res)=>{
        const { page, limit, search,category } = req.query;
        const skip = (page - 1) * limit;
        const pagelimit = parseInt(limit); 
        let whereClause = { isDelete: false, isAvailable: true };
        let selectClause = ['bookname', 'price', 'publicationYear', 'category', 'author','isAvailable'];
        let query = {};
        //pagination
        if (limit) {
          query.skip = skip;
          query.limit = pagelimit;
        }
        //search function based on author name and book name
        if (search) {
          const searchcharacter = search.replace(/[^A-Za-z ]/gm, "");
          const authories = await Author.find({ authorname: { contains: searchcharacter } }).meta({ makeLikeModifierCaseInsensitive: true });
          
          whereClause={
            and:[{
                isDelete: false
            },{
                or:[
                    { bookname :{ contains: searchcharacter }},
                    {author:{in: authories.map(author => author.id)}}
                ]

            }]
           
          }
        }
        //filter by category 
        if(category){
            whereClause.category=category
        }
        query.where = whereClause;
        query.select = selectClause;
    //get all avaliable book
        let book = await Book.find(query).meta({ makeLikeModifierCaseInsensitive: true }).populate('category').populate('author');
        return res.status(200).json({
            page,
            book
        });

    }

};

