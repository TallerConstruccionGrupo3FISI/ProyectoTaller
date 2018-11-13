
const express = require('express');
//const mongoose = require('mongoose');
const router = express.Router();
//const cliente = require("../models/cliente")();
const clienteControlador = require("../controlador/clienteControlador.js");
const autentificador = require("../controlador/autentificadorController.js");

router.route("/")
          .get(clienteControlador.listar_clientes,autentificador.loginRequired)
          .post(clienteControlador.crear_un_cliente,autentificador.loginRequired);
router.route("/secretaria")
          .get(clienteControlador.listar_clientes_secretaria,autentificador.loginRequired)
          .post(autentificador.registrar_secretaria,autentificador.loginRequired);
router.route("/medico")
          .get(clienteControlador.listar_clientes_medico,autentificador.loginRequired)
          .post(autentificador.registrar_medico,autentificador.loginRequired);
router.route("/:clienteID")
          .get(clienteControlador.leer_un_cliente,autentificador.loginRequired)
          .put(clienteControlador.actualizar_un_cliente,autentificador.loginRequired)
          .delete(clienteControlador.eliminar_un_cliente,autentificador.loginRequired);
router.route("/registro")
          .post(autentificador.registrar,autentificador.loginRequired);
router.route("/sign_in")
          .post(autentificador.sign_in);
router.route("/cambiarClaveAdmin",autentificador.loginRequired)
          .post(autentificador.cambiarClaveAdmin);
router.route("/cambiarEmailAdmin",autentificador.loginRequired)
          .post(autentificador.cambiarEmailAdmin);


module.exports = router;
