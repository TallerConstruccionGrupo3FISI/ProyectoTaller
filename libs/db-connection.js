const mongoose= require('mongoose');

let db;

module.exports = function conexion(){
  if(!db){
    mongoose.connect("mongodb://localhost:27017/veterinaria", { useNewUrlParser: true });
    db = mongoose.connection;
  }
  return db;
}
