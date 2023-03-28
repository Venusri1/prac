/**
 * AuthorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

    author:async(req,res)=>{
        const { page, limit, search } = req.query;
        const skip = (page - 1) * limit;
        const pagelimit = parseInt(limit); 
        let whereClause = { isDelete: false };
        let query = {};
        if (limit) {
          query.skip = skip;
          query.limit = pagelimit;
        }
        if (search) {
          const searchcharacter = search.replace(/[^A-Za-z ]/gm, "");
          whereClause.authorname = { contains: searchcharacter };
        }
        query.where = whereClause;
        let author = await Author.find(query).meta({ makeLikeModifierCaseInsensitive: true }).populateAll();
        return res.status(200).json({
          page,
          author
        });

    },

    addAuthor:async(req,res)=>{
        const authorname=req.body.authorname
        const author =await Author.find({authorname:authorname,isDelete:false});
        if(author.length !=0){
            return res.status(400).json({message:'Author name was already exists'})
        }else{
            const addAuthor=await Author.create({authorname:authorname}).fetch();
            if(addAuthor){
                console.log(addAuthor);
               return res.status(200).json({message:'success', Author:addAuthor})
            }else{
               return res.status(404).json({message:'category was not found'})
            }
        }
    },

    editAuthor:async(req,res)=>{
        const id=req.params.id;
        const author =await Author.findOne({id:id,isDelete:false })
            if(author){
                return res.status(200).json({message:'category details',author:author})
            }
            else{
                return res.status(404).json({message:'id was not found'})
            } 
    },

    updateAuthor:async(req,res)=>{
        const authorname=req.body.authorname;
        const id=req.params.id
        const author=await Author.findOne({authorname:authorname,isDelete:false})
        if(author){
            return res.status(400).json({message:'category was exists'})
        }else{
           await Author.updateOne(id,{authorname:authorname,updatedAt:new Date()})
            .then((author)=>{
                if(author){
                    return  res.status(200).json({message:'success',author})
                }else{
                    return res.status(404).json({message:'failed to update'})

                  }
              })
        }

    },
    deleteAuthor:async(req,res)=>{
        const id=req.params.id;
        const author=await Author.updateOne(id,{isDelete:true,deletedAt:new Date()})
        .then((author)=>{
            if(author){
                return  res.status(200).json({message:'success',author})
            }else{
                return res.status(404).json({message:'failed to delete'})

              }
          })
        
    }
  

};

