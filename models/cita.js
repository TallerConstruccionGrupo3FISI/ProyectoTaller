module.exports = function(){
  var db= require('../libs/db-connection.js')();
  var Schema = require('mongoose').Schema;

  var citas = Schema({
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
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "tipoModel"
    },
    tipoModel: {
      type: String,
      required: true,
      enum: ['BanoCorte','Consultas']
    }
  },
  {
    versionKey: false
  }
 );
  return db.model('Cita',citas,"cita");
}
