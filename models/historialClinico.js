module.exports = function(){
  var db= require('../libs/db-connection.js')();
  var Schema = require('mongoose').Schema;

  var historialClinico = Schema({

    FC: {
      type: Number,
      required: false
    },
    FR: {
      type: String,
      required: false
    },
    T: {
      type: String,
      required: false
    },
   linfonodos:{
     type: String,
     required: false
   },
   mucosas:{
     type: Number,
     required: false
   },
   DH:{
     type: String,
     required: false
   },
   pulso:{
     type: String,
     required: false
   },
   TLLC:{
     type: String,
     required: false
   },
   palpitacionAbdominal: {
     type: String,
     required: false
   },
   _mascota:{
     type: Schema.Types.ObjectId,
     ref: "Mascota",
     required: true
   }
  },
  {
    versionKey: false
  });
  return db.model('HistorialClinico',historialClinico,"historialClinicos");
}
