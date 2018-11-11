
const express = require('express');
//const mongoose = require('mongoose');
const router = express.Router();
const autentificador = require("../controlador/autentificadorController");
const db = require("../libs/db-connection")();
const keys = require('../config/keys');

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
router.get("/log_out",(req,res)=>{
  req.session.destroy(function(){
      console.log("user logged out.")
   });
   res.redirect('/login');
});
router.get("/formularioCliente", (req,res)=>{
    res.render("formularioCliente");
});
router.get("/perfilCliente",autentificador.loginRequired,(req,res)=>{
  //console.log("mi cookie " + req.cookies + "\nacabo la cookie");
  //console.log("valor de res.locals nuevo\n");
  //console.log(res.locals.user);
  res.render("perfilCliente");
});

router.get("/perfilInformacionCliente",autentificador.loginRequired,(req,res)=>{
  res.render("perfilInformacionCliente");
});

//DATOS SECRETARIA
router.get("/perfilInformacionSecretaria",autentificador.loginRequired,(req,res)=>{
  res.render("perfilInformacionSecretaria");
});
router.get("/perfilIngresarHorarioAtencion",autentificador.loginRequired,(req,res)=>{
  res.render("perfilIngresarHorarioAtencion");
});

router.get("/perfilInformacionMedico",autentificador.loginRequired,(req,res)=>{
  res.render("perfilInformacionMedico");
});

router.get("/perfilFormularioMascota",autentificador.loginRequired,(req,res)=>{
  res.render("perfilFormularioMascota");
});

router.get("/perfilMascota",(req,res)=>{
  res.render("perfilInformacionMascotas");
});
router.get("/perfilReservarCita",(req,res)=>{
  res.render("perfilReservarCita",{
   stripePublishableKey: keys.stripePublishableKey
 });
});
router.get("/perfilHistorialCita",(req,res)=>{
  res.render("perfilHistorialCita");
});
router.get("/perfilInformacionCitas",(req,res)=>{
  res.render("perfilSecretariaInformacionCitas");
});

router.get("/perfilSecretariaInformacionUsuarios", (req,res)=>{
  res.render("perfilSecretariaInformacionUsuarios");
});
router.get("/perfilHorarioDia", (req,res)=>{
    res.render("perfilHorarioDia");
});
router.get("/perfilMedicoCitaDia",(req,res)=>{
    res.render("perfilMedicoCitaDia");
});

router.get("/perfilMedicoIngresarHistorialClinico", (req,res)=>{
    res.render("perfilMedicoIngresarHistorialClinico");
});
router.get("/perfilMedicoHorarios", (req,res)=>{
    res.render("perfilMedicoHorarios");
});

router.get("/perfilAdmin",(req,res)=>{
    //req.session.user.bienvenido = "";
    res.render("perfilAdmin");
});
router.get("/perfilAdminRegistrarMedico", (req,res)=>{
    res.render("perfilAdminRegistrarMedico");
});

router.get("/perfilAdminRegistrarSecretaria", (req,res)=>{
    res.render("perfilAdminRegistrarSecretaria");
});
router.get("/perfilAdminCambiarClave",(req,res)=>{
  res.render("perfilAdminCambiarClave");
})


module.exports = router;
