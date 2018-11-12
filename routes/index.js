
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
  res.render("login",{
    loginFallo: req.flash("LoginFallo"),
    desautorizado: req.flash("Desautorizado"),
    deslogueado: req.flash("Desloguearse")
  });
});

router.get("/log_out",(req,res)=>{
   req.flash("Desloguearse","Usted se ha deslogueado exitosamente");
   req.session.destroy(function(){
      console.log("user logged out.")
   });
   res.redirect('/login');
});

router.get("/formularioCliente", (req,res)=>{
    res.render("formularioCliente",{
      camposIncorrectos: req.flash("camposIncorrectos")
    });
});
router.get("/perfilCliente",autentificador.loginRequired,(req,res)=>{
  //console.log("mi cookie " + req.cookies + "\nacabo la cookie");
  //console.log("valor de res.locals nuevo\n");
  //console.log(res.locals.user);
  res.render("perfilCliente");
});

router.get("/perfilInformacionCliente",autentificador.loginRequired,(req,res)=>{
  res.render("perfilInformacionCliente",{
    bienvenido: req.flash("Bienvenido"),
    pagoExito: req.flash("PagoExito")
  });
});

//DATOS SECRETARIA
router.get("/perfilInformacionSecretaria",autentificador.loginRequired,(req,res)=>{
  res.render("perfilInformacionSecretaria",{
    bienvenido: req.flash("Bienvenido")
  });
});
router.get("/perfilIngresarHorarioAtencion",autentificador.loginRequired,(req,res)=>{
  res.render("perfilIngresarHorarioAtencion");
});

router.get("/perfilInformacionMedico",autentificador.loginRequired,(req,res)=>{
  res.render("perfilInformacionMedico",{
    bienvenido: req.flash("Bienvenido")
  });
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
    res.render("perfilMedicoIngresarHistorialClinico",{
      exito: req.flash("Exito")
    });
});
router.get("/perfilMedicoHorarios", (req,res)=>{
    res.render("perfilMedicoHorarios");
});

router.get("/perfilAdmin",(req,res)=>{
  //req.flash("exito","hola mundo exito")
    res.render("perfilAdmin",{
    message:req.flash('message'),
    noEncontrado:req.flash('noEncontrado'),
    encontrado:req.flash('encontrado'),
    error:req.flash('error')
  });
    //res.render("perfilAdmin");
});
router.get("/perfilAdminRegistrarMedico", (req,res)=>{
    res.render("perfilAdminRegistrarMedico",{
      error: req.flash("Error"),
      exito: req.flash("Exito")
    });
});

router.get("/perfilAdminRegistrarSecretaria", (req,res)=>{
    res.render("perfilAdminRegistrarSecretaria",{
      error: req.flash("Error"),
      exito: req.flash("Exito")
    });
});
router.get("/perfilAdminCambiarClave",(req,res)=>{
  res.render("perfilAdminCambiarClave");
})
router.get("/perfilAdminCambiarEmail",(req,res)=>{
  res.render("perfilAdminCambiarEmail");
})


module.exports = router;
