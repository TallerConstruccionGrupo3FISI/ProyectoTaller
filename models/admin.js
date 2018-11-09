module.exports = function(){
  var db= require('../libs/db-connection.js')();
  var Schema = require('mongoose').Schema;
  var bcrypt = require('bcryptjs');

  var adminSchema= Schema({
    email:{
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    password:{
      type: String,
      required: true
    }

  });

  adminSchema.methods.comparePassword = function(pass){
    return bcrypt.compareSync(pass,this.password);
  };

  //db.model('horario',horarioSchema);
  //db.model('medico',medicoSchema);
  //db.model('secretaria',secretariaSchema);
  return db.model('Admin',adminSchema,"admins");
}
