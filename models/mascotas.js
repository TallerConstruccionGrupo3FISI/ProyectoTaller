module.exports = function(){
  var db= require('../libs/db-connection.js')();
  var Schema = require('mongoose').Schema;

  var mascotasSchema= Schema({

    "dni": {
			"type": "number",
			"required": true
		},
		"nombre": {
			"type": "string",
			"required": true
		},
		"raza": {
			"type": "string",
			"required": true
		},
		"edad": {
			"type": "number",
			"required": true
		},
		"enfermedad": {
			"type": "string",
			"required": false
		}
  },
  {
    versionKey: false
  });
  return db.model('Mascota',mascotasSchema,"mascota");
}
