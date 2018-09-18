module.exports = function(){
  var db= require('../libs/db-connection.js')();
  var Schema = require('mongoose').Schema;

  var perro= Schema({
    "name": String,
    "pedigree": String
  });
  return db.model('perros',perro);
}
