const express = require('express');
//const mongoose = require('mongoose');
const router = express.Router();
const medicoControlador = require("../controlador/medicoControlador.js");
const autentificador = require("../controlador/autentificadorController.js");

//let db = mongoose.createConnection();
//var mascota = require("../models/mascotas")();

/*
console.log(mascota);
router.get('/', (req, res)=>{
  mascota.find({}, (err, mascotas)=>{
    if(err) throw err;
    console.log(mascotas);
    res.json({mascota:mascotas});
  });
});
*/

router.route("/")
          .get(medicoControlador.listar_medicos)
          .post(medicoControlador.crear_un_medico);
router.route("/:medicoID")
          .get(medicoControlador.leer_un_medico)
          .put(medicoControlador.actualizar_un_medico)
          .delete(medicoControlador.eliminar_un_medico);
/*
router.route("/registro")
          .post(autentificador.registrar);
router.route("/sign_in")
          .post(autentificador.sign_in);
*/
module.exports = router;
