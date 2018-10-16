module.exports = function(){
  var db= require('../libs/db-connection.js')();
  var Schema = require('mongoose').Schema;
  var bcrypt = require('bcryptjs');

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
      required: true
    },
    telefono:{
      type: Number,
      required: true
    },
    fechaNacimiento:{
      type: Date,
      required: true
    },
    direccion:{
      type: String,
      required: true
    },
    distrito:{
        type: String,
        required: true
      },
    secretaria:{
      type: Schema.Types.ObjectId,
      ref: 'Secretaria',
      required: false
    },
    medico:{
      type: Schema.Types.ObjectId,
      ref: 'Medico',
      required: false
    },
    mascotas:[{
      type: Schema.Types.ObjectId,
      ref: "Mascota",
      required: false
    }]
  });




  clientesSchema.methods.comparePassword = function(pass){
    return bcrypt.compareSync(pass,this.password);
  };

  //db.model('horario',horarioSchema);
  //db.model('medico',medicoSchema);
  //db.model('secretaria',secretariaSchema);
  return db.model('Cliente',clientesSchema,"clientes");
}
