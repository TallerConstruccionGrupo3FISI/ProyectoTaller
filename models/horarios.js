module.exports = function(){
  var db= require('../libs/db-connection.js')();
  var Schema = require('mongoose').Schema;
  var horarioSchema = Schema({
      horaInicio:{
        type: String,
        required: true
      },
      horaSalida:{
        type: String,
        required: true
      },
      fecha:{
        type: Date,
        required: true
      },
      _cita: {
        type: [{
        type: Schema.Types.ObjectId,
        ref: "Cita",
        required: false

      }],
      validate: [arrayLimit, '{PATH} excede el limite de 6' ]
    }
  },
  {
    versionKey: false
  });

  function arrayLimit(val) {
    return val.length <= 6;
  }

  return db.model('Horario',horarioSchema,"horarios");
}
