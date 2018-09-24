
const express = require('express');
//const mongoose = require('mongoose');
const router = express.Router();
//const cliente = require("../models/cliente")();
const clienteControlador = require("../controlador/clienteControlador.js");
const autentificador = require("../controlador/autentificadorController.js");

router.route("/")
          .get(autentificador.loginRequired,clienteControlador.listar_clientes)
          .post(autentificador.loginRequired, clienteControlador.crear_un_cliente);
router.route("/:clienteID")
          .get(clienteControlador.leer_un_cliente)
          .put(clienteControlador.actualizar_un_cliente)
          .delete(clienteControlador.eliminar_un_cliente);
router.route("/registro")
          .post(autentificador.registrar);
router.route("/sign_in")
          .post(autentificador.sign_in);



module.exports = router;
