module.exports = function(){
  var db= require('../libs/db-connection.js')();
  var Schema = require('mongoose').Schema;

  var mascotasSchema= Schema({
    _dueño: {
      type: Schema.Types.ObjectId,
      ref: "clientes",
      required: true
    },
		nombre: {
			type: String,
			required: true
		},
    tipo:{
      type: String,
      required: true
    },
		raza: {
			type: String,
			required: true
		},
		fechaNacimiento: {
			type: Date,
			required: true
		},
		sexo: {
			type: String,
			required: false
		},
    alimentacion: {
      type: String,
      required: false
    },
    estirilizado:{
      type: Boolean,
      required: true
    },
    conviveConOtrosAnimales: {
      type: Boolean,
      required: true
    },
    vacunado: {
      type: Boolean,
      required: true
    },
    ultimaVisitaVeterinario: {
      type: Date,
      required: false
    },
    enfermedadesDiagnosticadas: {
      type: Array,
      required: false
    },
    citas: [{
      type: Schema.Types.ObjectId,
      ref: "citas",
      required: false
    }],
    historialClinico: {
      type: Schema.Types.ObjectId,
      ref: "historialClinico",
      required: false
    }
  },
  {
    versionKey: false
  });



  return db.model('Mascota',mascotasSchema,"mascotas");
}
