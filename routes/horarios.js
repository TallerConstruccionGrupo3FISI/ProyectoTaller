
const express = require('express');
//const mongoose = require('mongoose');
const router = express.Router();
//const cliente = require("../models/cliente")();
const horarioControlador = require("../controlador/horarioControlador.js");
const autentificador = require("../controlador/autentificadorController.js");

router.route("/")
          .get(horarioControlador.listar_horarios,autentificador.loginRequired)
          .post(horarioControlador.crear_un_horario,autentificador.loginRequired);
router.route("/hoy")
          .get(horarioControlador.horario_hoy,autentificador.loginRequired);
router.route("/:fecha")
          .get(horarioControlador.leer_un_horario,autentificador.loginRequired)
          .put(horarioControlador.actualizar_un_horario,autentificador.loginRequired)
          .delete(horarioControlador.eliminar_un_horario,autentificador.loginRequired);

module.exports = router;
