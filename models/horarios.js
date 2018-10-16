module.exports = function(){
  var db= require('../libs/db-connection.js')();
  var Schema = require('mongoose').Schema;
  var horarioSchema = Schema({
      dia: {
        type: String,
        required: true
      },
      horaInicio:{
        type: String,
        required: true
      },
      horaSalida:{
        type: String,
        required: true
      }
  },
  {
    versionKey: false
  });



  return db.model('Horario',horarioSchema,"horarios");
}
