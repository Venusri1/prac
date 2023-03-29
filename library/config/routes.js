/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    'POST /adminlogin':'AdminController.adminuserLogin', // post route for admin login
    'POST /adminlogout':'AdminController.adminuserLogout', // post route for admin logout


    'POST /signup':'UserController.signUp',// post route for user signup
    'POST /login':'UserController.logIn', // post route for user login
    'POST /logout':'UserController.logOut',// post route for user logout
    'GET /':'UserController.user',// get route to check the available book for user
     
    'GET /category':'CategoryController.category',//get all category route
    'POST /category':'CategoryController.addCategory',// post route to add category
    'GET /category/:id':'CategoryController.editCategory',//get route for category details by id 
    'POST /category/:id':'CategoryController.updateCategory',//post route to update the category details by id 
    'DELETE /category/:id':'CategoryController.deleteCategory',//delete route for category  by id 

    'GET /author':'AuthorController.author',//get route for author details
    'POST /author':'AuthorController.addAuthor',//post route to add author
    'GET /author/:id':'AuthorController.editAuthor', //get route for author details by id 
    'POST /author/:id':'AuthorController.updateAuthor',//post route to update the author details by id 
    'DELETE /author/:id':'AuthorController.deleteAuthor',//delete route for author  by id 
    
    
    'GET /book':'BookController.book',//get route for book details
    'POST /book':'BookController.addBook',//post route to add book
    'GET /book/:id':'BookController.editBook',//get route for book details by id 
    'POST /book/:id':'BookController.updateBook',//post route to update the book details by id 
    'DELETE /book/:id':'BookController.deleteBook',//delete route for book  by id 

    'POST /issuedbook':'IssueandreturnbookController.issuedBook',//post route for issuing book
    'POST /returnedbook':'IssueandreturnbookController.returnedBook',//post route for returning book
    'GET /issuedbookhistory/:id':'IssueandreturnbookController.issuedbookHistory',//get history of issued book 
    'GET /bookhistory':'IssueandreturnbookController.bookHistory',//get history of all issued and return book
    

  
};
