/**
 * Book.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    bookname:{
      type:'string',
      required:true
    },
    price:{
      type:'number',
      required:true
    },
    publishyear:{
      type:'ref',
      columnType:'date',
    },
    category:{
      model:'Category'
    },
    author:{
      model:'Author'
    },

    createdAt:{
      type:'ref',
      columnType:'date',
      defaultsTo: new Date()
    },
    updatedAt:{
      type:'ref',
      columnType:'date'
    },
    deletedAt:{
      type:'ref',
      columnType:'date'
    },
    isDelete:{
      type: 'boolean', 
      defaultsTo: false,
    },

  

  },

};

