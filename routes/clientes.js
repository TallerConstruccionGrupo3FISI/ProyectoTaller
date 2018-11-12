
const express = require('express');
//const mongoose = require('mongoose');
const router = express.Router();
//const cliente = require("../models/cliente")();
const clienteControlador = require("../controlador/clienteControlador.js");
const autentificador = require("../controlador/autentificadorController.js");

router.route("/")
          .get(clienteControlador.listar_clientes)
          .post(clienteControlador.crear_un_cliente);
router.route("/secretaria")
          .get(clienteControlador.listar_clientes_secretaria)
          .post(autentificador.registrar_secretaria);
router.route("/medico")
          .get(clienteControlador.listar_clientes_medico)
          .post(autentificador.registrar_medico);
router.route("/:clienteID")
          .get(clienteControlador.leer_un_cliente)
          .put(clienteControlador.actualizar_un_cliente)
          .delete(clienteControlador.eliminar_un_cliente);
router.route("/registro")
          .post(autentificador.registrar);
router.route("/sign_in")
          .post(autentificador.sign_in);
router.route("/cambiarClaveAdmin")
          .post(autentificador.cambiarClaveAdmin);
router.route("/cambiarEmailAdmin")
          .post(autentificador.cambiarEmailAdmin);


module.exports = router;
