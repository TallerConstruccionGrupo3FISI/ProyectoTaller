module.exports = function(){
  var db= require('../libs/db-connection.js')();
  var Schema = require('mongoose').Schema;

  var citas = Schema({
    _mascota: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Mascota"
    },
    fecha: {
      type: Date,
      required: false
    },
    hora: {
      type: Date,
      required: false
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
