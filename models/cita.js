module.exports = function(){
  var db= require('../libs/db-connection.js')();
  var Schema = require('mongoose').Schema;

  var citas = Schema({
    _mascota: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Mascota"
    },
<<<<<<< HEAD
    _horario: {
=======
    _horario:{
>>>>>>> alexandra
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Horario"
    },
    motivo: {
      type: String,
      required: false
    },
    estado: {
      type: String,
      required: false
    },
    tipo: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false
  }
 );
  return db.model('Cita',citas,"cita");
}
