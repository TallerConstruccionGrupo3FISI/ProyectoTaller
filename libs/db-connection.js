const mongoose= require('mongoose');

let db;

module.exports = function conexion(){
  if(!db){
    db = mongoose.connect("mongodb://localhost:27017/veterinaria");
  }
  return db;
}
