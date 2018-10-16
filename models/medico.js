module.exports = function(){
  var db= require('../libs/db-connection.js')();
  var Schema = require('mongoose').Schema;
  var bcrypt = require('bcryptjs');

  var medicoSchema = Schema({
    _cliente: {
      type: Schema.Types.ObjectId,
      ref: "clientes"
    },
    especialidad: {
      type: String,
      required: true
    },
    cargo: {
      type: String,
      required: true
    },
    horario:[{
      type: Schema.Types.ObjectId,
      ref: "horarios"
    }]
  });

  return db.model('Medico',medicoSchema,"medicos");
 }
