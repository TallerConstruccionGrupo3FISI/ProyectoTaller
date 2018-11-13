const express = require('express');
//const mongoose = require('mongoose');
const router = express.Router();
const mascotaControlador = require("../controlador/mascotaControlador.js");
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
          .get(mascotaControlador.listar_mascotas,autentificador.loginRequired)
          .post(mascotaControlador.crear_una_mascota,autentificador.loginRequired);
router.route("/:mascotaID")
          .get(mascotaControlador.leer_mascotas,autentificador.loginRequired)
          .put(mascotaControlador.actualizar_una_mascota,autentificador.loginRequired)
          .delete(mascotaControlador.eliminar_una_mascota,autentificador.loginRequired);
/*
router.route("/registro")
          .post(autentificador.registrar);
router.route("/sign_in")
          .post(autentificador.sign_in);
*/
module.exports = router;
