module.exports = function(){
  var db= require('../libs/db-connection.js')();
  var Schema = require('mongoose').Schema;
  var bcrypt = require('bcryptjs');

  var secretariaSchema = Schema({
    _cliente: {
      type: Schema.Types.ObjectId,
      ref: "clientes"
    },
    horario:[{
      type: Schema.Types.ObjectId,
      ref: "horario"}]
});
return db.model('Secretaria',secretariaSchema,"secretarias");
}
