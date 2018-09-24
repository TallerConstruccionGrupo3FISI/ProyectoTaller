module.exports = function(){
  var db= require('../libs/db-connection.js')();
  var Schema = require('mongoose').Schema;
  var bcrypt = require('bcryptjs');
  var clientesSchema= Schema({
    nombres:{
      type: String,
      required: true
    },
    apellidos:{
      type: String,
      required: true
    },
    username:{
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

  clientesSchema.methods.comparePassword = function(pass){
    return bcrypt.compareSync(pass,this.password);
  };

  return db.model('Cliente',clientesSchema,"clientes");
}


/*
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let db= require("../libs/db-connection.js")();

var ClienteSchema = new Schema({
  nombres:{
    type: String,
    required: true
  },
  apellidos:{
    type: String,
    required: true
  },
  username:{
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

var Cliente = db.model('Clientes',ClienteSchema,'cliente');

module.export = Cliente;*/
