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
          .get(mascotaControlador.listar_mascotas)
          .post(mascotaControlador.crear_una_mascota);
router.route("/:mascotaID")
          .get(mascotaControlador.leer_mascotas)
          .put(mascotaControlador.actualizar_una_mascota)
          .delete(mascotaControlador.eliminar_una_mascota);
router.route("/registro")
          .post(mascotaControlador.crear_una_mascota);
/*
router.route("/registro")
          .post(autentificador.registrar);
router.route("/sign_in")
          .post(autentificador.sign_in);
*/
module.exports = router;
