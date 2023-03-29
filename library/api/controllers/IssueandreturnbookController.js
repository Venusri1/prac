/**
 * IssueandreturnbookController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {
    // get all book history 
    bookHistory:async(req,res)=>{
        const bookHistory=await Issueandreturnbook.find({ }).populate('book');
        if(bookHistory){
            return  res.status(200).json({message:' book history',bookHistory})
        }else{
            return  res.status(200).json({message:'not found'})
        }
    },
  // get only issued book history which was not returned at
    issuedbookHistory:async(req,res)=>{
        const id=req.params.id
        const issuedbookHistory=await Issueandreturnbook.find({book:id,isIssued:true,isReturned:false}).populate('book');
        if(issuedbookHistory){
            return  res.status(200).json({message:' book history',issuedbookHistory})
        }else{
         return  res.status(200).json({message:'not found'})
        }
    },
  //issuing book to user 
    issuedBook:async(req,res)=>{
        const {book,issuedBookBy}=req.body
        //user validation to issue the book
        const user=await User.findOne({id:issuedBookBy});
        if(!user){
            return  res.status(200).json({message:'invalid user id'})
        }else{
            //check whether that was already issued or avaliable or not
            const books=await Book.findOne({id:book,isAvailable:true,isDelete:false});
            if(!books){
                return  res.status(200).json({message:'book was already issued'})
            }else{
                //issuing book to user after successful validations
                const issuedBooks=await Issueandreturnbook.create({book:book,issuedBookBy:issuedBookBy,isIssued:true}).fetch();
                if(issuedBooks){
                    //updating availability status of the book
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
         //user validation to return the book
        const user=await User.findOne({id:returnBookBy});
        if(!user){
            return  res.status(200).json({message:'invalid user id'})
        }else{
            //checking whether same user was returning the  book or not after issuing the book
            const issuedtrue=await Issueandreturnbook.findOne({book:book,issuedBookBy:returnBookBy,isIssued:true,isReturned:false});
            if(!issuedtrue){
               return res.status(200).json({message:'please issue the book'})
            }
            else{
                //updating return of the book
                const returnBooks= await Issueandreturnbook.updateOne({book:book,issuedBookBy:returnBookBy,isIssued:true,isReturned:false}).set({returnBookBy:returnBookBy,isReturned:true,isReturnedAt:new Date()});
                if(returnBooks){
                     //updating availability status of the book
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

