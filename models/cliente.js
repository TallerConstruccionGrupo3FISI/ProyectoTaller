module.exports = function(){
  var db= require('../libs/db-connection.js')();
  var Schema = require('mongoose').Schema;

  var clientesSchema= new mongoose.Schema({
    nombres:{
      type: String,
      required: true
    },
    apellidos:{
      type: String,
      required: true
    }
    user:{
      type: String,
      unique:true,
      required: true,
      trim: true
    },
    email:{
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password:{
      type: String,
      required: true
    },
    dni:{
      type: String,
      required: true
    },
    telefono:{
      type: Number,
      required: true
    },
    direccion:{
      type: String,
      required: true
    },
    administrador:{
      type: Boolean,
      required: true
    },
    operario:{
      type: Boolean,
      required: true
    }
  });
  return db.model('clientes',clientesSchema);
}
