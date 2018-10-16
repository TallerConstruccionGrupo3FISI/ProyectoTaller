module.exports = function(){
  var db= require('../libs/db-connection.js')();
  var Schema = require('mongoose').Schema;

  var consultaSchema = Schema({
    _cita:{
      type: Schema.Types.ObjectId,
      ref: "citas"
    },
    tipo: {
      type: String,
      required: false
    },
    motivo: {
      type: String,
      required: false
    }
  },
  {
    versionKey: false
  });
  return db.model('Consulta',consultaSchema,"consultas");
}
