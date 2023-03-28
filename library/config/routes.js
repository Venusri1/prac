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
    'POST /admin/login':'AdminController.adminuserLogin',
    'POST /admin/logout':'AdminController.adminuserLogout',


    'POST /signup':'UserController.signUp',
    'POST /login':'UserController.logIn',
    'POST /logout':'UserController.logOut',
     
    'GET /category':'CategoryController.category',
    'POST /category':'CategoryController.addCategory',
    'GET /category/:id':'CategoryController.editCategory',
    'POST /category/:id':'CategoryController.updateCategory',
    'DELETE /category/:id':'CategoryController.deleteCategory',

    'GET /author':'AuthorController.author',
    'POST /author':'AuthorController.addAuthor',
    'GET /author/:id':'AuthorController.editAuthor', 
    'POST /author/:id':'AuthorController.updateAuthor',
    'DELETE /author/:id':'AuthorController.deleteAuthor',
    
    'GET /':'BookController.user',
    'GET /book':'BookController.book',
    'POST /book':'BookController.addBook',
    'GET /book/:id':'BookController.editBook',
    'POST /book/:id':'BookController.updateBook',
    'DELETE /book/:id':'BookController.deleteBook',

    'POST /issuedbook':'IssueandreturnbookController.issuedBook',
    'POST /returnedbook':'IssueandreturnbookController.returnedBook',
    'GET /bookhistory/:id':'IssueandreturnbookController.bookHistory',

  
};
