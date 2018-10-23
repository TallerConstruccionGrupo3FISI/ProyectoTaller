module.exports = function(){
  var db= require('../libs/db-connection.js')();
  var Schema = require('mongoose').Schema;

  var banoCorteSchema = Schema({
    _cita:{
      type: Schema.Types.ObjectId,
      ref: "citas"
    },
    tipo: {
      type: String,
      required: false
    },
    corte: {
      type: String,
      required: false
    }
  },
  {
    versionKey: false
  });
  return db.model('BanoCorte',banoCorteSchema,"banoCortes");
}
