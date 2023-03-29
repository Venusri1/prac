/**
 * BookController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
    //get all deatils of book 
    book:async(req,res)=>{
        const { page, limit, search } = req.query;
        const skip = (page - 1) * limit;
        const pagelimit = parseInt(limit); 
        let whereClause = { isDelete: false };
        let query = {};
        //pagination 
        if (limit) {
          query.skip = skip;
          query.limit = pagelimit;
        }
        //search function for book name 
        if (search) {
          const searchcharacter = search.replace(/[^A-Za-z ]/gm, "");
          whereClause.bookname = { contains: searchcharacter };
        }
        query.where = whereClause;
        //get details of book with author and category details
        let book = await Book.find(query).meta({ makeLikeModifierCaseInsensitive: true }).populateAll();
        return res.status(200).json({
          page,
          book
        });

    },
 // add book
    addBook:async(req,res)=>{
        const {bookname,price,publicationYear,category,author}=req.body;
        //category id validation
        const categoryValidation=await Category.findOne({id:category,isDelete:false});
        if(!categoryValidation){
            res.status(200).json({message:'invalid Category id'})
        }
       else{
        //author id validation
        const authorValidation=await Author.findOne({id:author,isDelete:false})
           if(!authorValidation){
            res.status(200).json({message:'invalid author id'})
           }
           else{
            // book details validation 
            const book=await Book.find({bookname:bookname,price:price,publicationYear:publicationYear,category:category,author:author,isDelete:false});
            if(book.length != 0){
                res.status(200).json({message:'Book was already exits'})

            }else{
                //creating new book
                 const addBook=await Book.create({bookname:bookname,price:price,publicationYear:publicationYear,category:category,author:author}).fetch()
                    if(addBook){
                        return res.status(200).json({message:'success', addBook:addBook})
                    }else{
                    return res.status(404).json({message:'book was not added'})
                    }
            }
           }
       }
    },

  //getting book details by id
    editBook:async(req,res)=>{
        const id=req.params.id;
     //finding single book details 
        const book=await Book.findOne({id:id,isDelete:false}).populateAll();
        if(book){
            return res.status(200).json({message:'success', book:book})
        }else{
            return res.status(404).json({message:'book was not found'})
        }

    },
//updating book details by id
    updateBook:async(req,res)=>{
        const id=req.params.id;
        const {bookname,price,publicationYear,category,author}=req.body;
        //category id validation
        const categoryValidation=await Category.findOne({id:category,isDelete:false});
        if(!categoryValidation){
            res.status(200).json({message:'invalid Category id'})
        }
       else{
        //author id validation
        const authorValidation=await Author.findOne({id:author,isDelete:false})
           if(!authorValidation){
            res.status(200).json({message:'invalid author id'})
           }
           else{
            //updating book after successfull validations
                await Book.updateOne(id,{bookname:bookname,price:price,publicationYear:publicationYear,category:category,author:author,updatedAt:new Date()})
                .then((book)=>{
                    if(book){
                        return  res.status(200).json({message:'success',book})
                    }else{
                        return res.status(404).json({message:'failed to update'})
                      }
                  })
            
           }
       }
        
    },
    
    //deleting book by id
    deleteBook:async(req,res)=>{
        const id=req.params.id;
        // if book was issued to user then after some duration admin cannot delete the book which was issued to user
        const book=await Book.findOne({id:id,isDelete:false,isAvailable:true});
        if(!book){
            return res.status(404).json({message:'failed to delete beacuse book was issued to user'})
        }else{
            //after avaliable of the book then only admin delte the book from libray
            await Book.updateOne(id,{isDelete:true,deletedAt:new Date()})
            .then((book)=>{
                if(book){
                    return  res.status(200).json({message:'success'})
                }else{
                    return res.status(404).json({message:'failed to delete'})
                  }
              })
        }
    },



};

