/**
 * CategoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    category:async(req,res)=>{
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
          whereClause.name = { contains: searchcharacter };
        }
        query.where = whereClause;
        let categorys = await Category.find(query).meta({ makeLikeModifierCaseInsensitive: true }).populate('book');
        return res.status(200).json({
          page,
          categorys
        });
    },
    addCategory:async(req,res)=>{
        const name=req.body.name;
        const category=await Category.find({name:name,isDelete:false});
        if(category.length !=0 ){
            return res.status(400).json({message:'category was exists'})
        }else{
            const addcategory=await Category.create({name:name}).fetch();
            if(addcategory){
                console.log(addcategory);
               return res.status(200).json({message:'success', category:addcategory})
            }else{
               return res.status(404).json({message:'category was not found'})
            }
        }
    },

    editCategory:async(req,res)=>{
        const id=req.params.id;
        const category =await Category.findOne({id:id,isDelete:false })
            if(category){
                return res.status(200).json({message:'category details',category:category})
            }
            else{
                return res.status(404).json({message:'id was not found'})
            } 
    },
    
    updateCategory:async(req,res)=>{
        const name=req.body.name;
        const id=req.params.id
        const category=await Category.findOne({name:name,isDelete:false})
        if(category){
            return res.status(400).json({message:'category was exists'})
        }else{
           await Category.updateOne(id,{name:name,updatedAt:new Date()})
            .then((category)=>{
                if(category){
                    return  res.status(200).json({message:'success',category})
                }else{
                    return res.status(404).json({message:'failed to update'})

                  }
              })
        }
    },

    deleteCategory:async(req,res)=>{
        const id=req.params.id;
        const category=await Category.updateOne(id,{isDelete:true,deletedAt:new Date()})
        .then((category)=>{
            if(category){
                return  res.status(200).json({message:'success',category})
            }else{
                return res.status(404).json({message:'failed to update'})

              }
          })
    }





};

