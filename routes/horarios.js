
const express = require('express');
//const mongoose = require('mongoose');
const router = express.Router();
//const cliente = require("../models/cliente")();
const horarioControlador = require("../controlador/horarioControlador.js");
const autentificador = require("../controlador/autentificadorController.js");

router.route("/")
          .get(horarioControlador.listar_horarios)
          .post(horarioControlador.crear_un_horario);
router.route("/hoy")
          .get(horarioControlador.horario_hoy);
router.route("/:horarioID")
          .get(horarioControlador.leer_un_horario)
          .put(horarioControlador.actualizar_un_horario)
          .delete(horarioControlador.eliminar_un_horario);

module.exports = router;
