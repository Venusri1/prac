/**
 * Category.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name:{
      type:'string',
      required:true,
      unique:true
    },
    book:{
      collection: 'book',
      via: 'category'
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
  datastore:'mongodb',

};

