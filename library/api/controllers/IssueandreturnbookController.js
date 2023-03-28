/**
 * IssueandreturnbookController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {

    bookHistory:async(req,res)=>{
        const book=req.params.book
        const issuedtrue=await Issueandreturnbook.find({book:book,isIssued:true,isReturned:false}).populate('book');
        if(issuedtrue){
            return  res.status(200).json({message:'issued book history',issuedtrue})
        }else{
            return  res.status(200).json({message:'not found'})
        }
    },

    issuedBook:async(req,res)=>{
        const {book,issuedBookBy}=req.body
        const user=await User.findOne({id:issuedBookBy});
        if(!user){
            return  res.status(200).json({message:'invalid user id'})

        }else{
            const books=await Book.findOne({id:book,isAvailable:true,isDelete:false});
            if(!books){
                return  res.status(200).json({message:'book was already issued'})
    
            }else{
                const issuedBooks=await Issueandreturnbook.create({book:book,issuedBookBy:issuedBookBy,isIssued:true}).fetch();
                if(issuedBooks){
                    const bookavailable=await Book.updateOne({id:book}).set({isAvailable:false});
                    console.log(bookavailable);
                    return res.status(200).json({message:'book was issued',issuedBooks})
                }else{
                    return res.status(200).json({message:'db error'})
    
                }
            }
        }

    },

    returnedBook:async(req,res)=>{
        const {book,returnBookBy}=req.body;
        const user=await User.findOne({id:returnBookBy});
        if(!user){
            return  res.status(200).json({message:'invalid user id'})
        }else{
            const issuedtrue=await Issueandreturnbook.findOne({book:book,issuedBookBy:returnBookBy,isIssued:true,isReturned:false});
            if(!issuedtrue){
               return res.status(200).json({message:'please issue the book'})
            }
            else{
                const returnBooks= await Issueandreturnbook.updateOne({book:book,issuedBookBy:returnBookBy,isIssued:true,isReturned:false}).set({returnBookBy:returnBookBy,isReturned:true,isReturnedAt:new Date()});
                if(returnBooks){
                    const bookavailable=await Book.updateOne({id:book}).set({isAvailable:true});
                    console.log(bookavailable);
                    return res.status(200).json({message:'book was returned',returnBooks})
              }else{
                  return res.status(200).json({message:'db error'})
              }
    
            }
        }
        }

    
  

};

