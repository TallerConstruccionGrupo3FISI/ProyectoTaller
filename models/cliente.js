module.exports = function(){
  var db= require('../libs/db-connection.js')();
  var Schema = require('mongoose').Schema;
  var bcrypt = require('bcryptjs');
  var moment = require('moment');
  var clientesSchema= Schema({
    nombres:{
      type: String,
      required: true
    },
    apellidos:{
      type: String,
      required: true
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
      unique: true,
      required: true
    },
    telefono:{
      type: Number,
      required: true
    },
    fechaNacimiento:{
      type: Date,
      required: true,
      validate: verificarFecha
    },
    direccion:{
      type: String,
      required: true
    },
    distrito:{
        type: String,
        required: true
      },
    _secretaria:{
      type: Schema.Types.ObjectId,
      ref: 'Secretaria',
      required: false
    },
    _medico:{
      type: Schema.Types.ObjectId,
      ref: 'Medico',
      required: false
    },
    _mascotas:[{
      type: Schema.Types.ObjectId,
      ref: "Mascota",
      required: false
    }],
    _citas:[{
      type: Schema.Types.ObjectId,
      ref: "Cita",
      required: false
    }]
  });

  function verificarFecha(fecha){
      var fechaActual = moment(new Date());
      var fechaComparar = moment(fecha);
      console.log("FECHA ACTUAL",fechaActual);
      var diferencia = fechaActual.diff(fechaComparar,'years');
      console.log("diferencia",diferencia);
      return (diferencia >=18);
  };

  clientesSchema.methods.comparePassword = function(pass){
    return bcrypt.compareSync(pass,this.password);
  };

  //db.model('horario',horarioSchema);
  //db.model('medico',medicoSchema);
  //db.model('secretaria',secretariaSchema);
  return db.model('Cliente',clientesSchema,"clientes");
}
