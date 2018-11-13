const express = require('express');
//const mongoose = require('mongoose');
const router = express.Router();
const secretariaControlador = require("../controlador/secretariaControlador.js");
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
          .get(secretariaControlador.listar_secretarias,autentificador.loginRequired)
          .post(secretariaControlador.crear_una_secretaria,autentificador.loginRequired);
router.route("/:secretariaID")
          .get(secretariaControlador.leer_una_secretaria,autentificador.loginRequired)
          .put(secretariaControlador.actualizar_una_secretaria,autentificador.loginRequired)
          .delete(secretariaControlador.eliminar_una_secretaria,autentificador.loginRequired);
/*
router.route("/registro")
          .post(autentificador.registrar);
router.route("/sign_in")
          .post(autentificador.sign_in);
*/
module.exports = router;
