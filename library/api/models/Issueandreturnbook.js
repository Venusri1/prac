/**
 * Issueandreturnbook.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    book:{
      model:'book'
    },
    issuedBookBy:{
      model:'user'
    },
    isIssued:{
      type: 'boolean', 
      defaultsTo: false,
    },
    isIssuedAt:{
      type:'ref',
      columnType:'date',
      defaultsTo: new Date()
    },
    returnBookBy:{
      model:'user'
    },
    isReturned:{
      type: 'boolean', 
      defaultsTo: false,
    },
    isReturnedAt:{
      type:'ref',
      columnType:'date',
     
    }
  },
  customToJSON: function() {
    return _.omit(this, ['isReturnedAt','isIssuedAt','createdAt','updatedAt', '__v']);
  },
  datastore:'mongodb',

};

