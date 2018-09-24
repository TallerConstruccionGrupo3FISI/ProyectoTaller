
const express = require('express');
//const mongoose = require('mongoose');
const router = express.Router();
const autentificador = require("../controlador/autentificadorController");
const db = require("../libs/db-connection")();

//let db = mongoose.createConnection();

//var perro = require('../models/perro')();

db.once('open', function() {
  console.log("CONECTADO A LA BD");
});

router.get("/", (req,res)=>{
    res.render('index');
});
router.get("/clinica",(req,res)=>{
  res.render("clinica");
});
router.get("/nosotros",(req,res)=>{
  res.render("nosotros");
});
router.get("/servicios",(req,res)=>{
  res.render("servicios");
});
router.get("/contactos",(req,res)=>{
  res.render("contactos");
});
router.get("/login",(req,res)=>{
  res.render("login");
});
router.get("/formularioCliente", (req,res)=>{
    res.render("formularioCliente");
});
router.get("/perfilCliente",(req,res)=>{
  res.render("perfilCliente");
})
router.get("/perfilMascota",(req,res)=>{
  res.render("perfilInformacionMascotas");
});

module.exports = router;
