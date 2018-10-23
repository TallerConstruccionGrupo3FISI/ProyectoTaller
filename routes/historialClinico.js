
const express = require('express');
//const mongoose = require('mongoose');
const router = express.Router();
//const cliente = require("../models/cliente")();
const historialClinicoControlador = require("../controlador/historialClinicoControlador.js");
const autentificador = require("../controlador/autentificadorController.js");

router.route("/")
          .get(historialClinicoControlador.listar_historialClinico)
          .post(historialClinicoControlador.crear_un_historialClinico);
router.route("/:historialClinicoID")
          .get(historialClinicoControlador.leer_un_historialClinico)
          .put(historialClinicoControlador.actualizar_un_historialClinico)
          .delete(historialClinicoControlador.eliminar_un_historialClinico);

module.exports = router;
