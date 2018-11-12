// AuthController.js
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config.js');
var clientes = require('../models/cliente.js')();
var expressSession = require('express-session');
var medicos = require('../models/medico.js')();
var secretarias = require('../models/secretaria.js')();


var admin = require('../models/admin.js')();

//let db= require("../libs/db-connection.js")();
//var clientes = mongoose.model('clientes');

//FUNCION PARA REGISTRAR A UN CLIENTE
exports.registrar= function(req, res){
  var nuevoCliente = new clientes(req.body);
  nuevoCliente.password = bcrypt.hashSync(req.body.password,10);
  nuevoCliente.save(function(err){
    if(err){
      //return res.status(400).send({
      // message: err
     //});
      req.flash("camposIncorrectos","Uno o mas campos incorrectos");
      return res.redirect("/formularioCliente");
    }
    else{
        //res.json(nuevoCliente);
        req.session.user = nuevoCliente;
        req.flash("Bienvenido","Bienvenido al sistema");
        return res.redirect('/perfilInformacionCliente');
    }
  });
};

//FUNCION PARA REGISTRAR UN MEDICO
exports.registrar_medico= function(req, res){


  var nuevoCliente = new clientes({
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      email: req.body.email,
      dni: req.body.dni,
      telefono: req.body.telefono,
      fechaNacimiento: req.body.fechaNacimiento,
      direccion: req.body.direccion,
      distrito: req.body.distrito
  });


  nuevoCliente.password = bcrypt.hashSync(req.body.password,10);

  var medico = new medicos({
    _cliente : nuevoCliente._id,
    especialidad: req.body.especialidad,
    cargo: req.body.cargo,
    _horario: []
  });

  nuevoCliente._medico = medico._id;

  nuevoCliente.save(function(err){
    if(err){
      req.flash("Error","No se ha podido crear al medico");
      res.redirect("/perfilAdminRegistrarMedico");
      }
    else{
        medico.save(function(err) {
          if(err){
            //return res.status(400).send({
            // message: err
           //});
           req.flash("Error","No se ha podido crear al medico");
           res.redirect("/perfilAdminRegistrarMedico");
          }
      });
      req.flash("Exito","Se ha creado un medico");
      res.redirect("/perfilAdminRegistrarMedico");
    }
  });
};

//FUNCION PARA REGISTRAR UNA SECRETARIA
exports.registrar_secretaria= function(req, res){

  var nuevoCliente = new clientes(
    {
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      email: req.body.email,
      dni: req.body.dni,
      telefono: req.body.telefono,
      fechaNacimiento: req.body.fechaNacimiento,
      direccion: req.body.direccion,
      distrito: req.body.distrito
    }
  );

  var secretaria = new secretarias({
    _cliente: nuevoCliente._id,
    _horario: []
  });
  nuevoCliente.password = bcrypt.hashSync(req.body.password,10);
  nuevoCliente._secretaria = secretaria._id;
  nuevoCliente.save(function(err, user){
    if(err){
      //return res.status(400).send({
      // message: err
     //});
     req.flash("Error","Hay un campo o mas con errores");
     res.redirect("/perfilAdminRegistrarSecretaria");
    }
    else{
        secretaria.save(function(err){
          if(err){
            //return res.status(400).send({
            //  message: err
            //})
            req.flash("Error","No se ha podido crear la secretaria");
            res.redirect("/perfilAdminRegistrarSecretaria");
          }
        });
        req.flash("Exito","Se ha creado una secretaria");
        res.redirect("/perfilAdminRegistrarSecretaria");
        }
  });
};


//FUNCION PARA VALIDAR EL LOGIN
exports.sign_in = function(req, res){
  console.log(req.body);
  admin.findOne({
    email: req.body.email
  }, function(err, admines){
    if(err) throw err;
    if(!admines || !admines.comparePassword(req.body.password)){
            clientes.findOne({
             email: req.body.email
           }, function(err, cliente) {
             if (err) throw err;
             if (!cliente || !cliente.comparePassword(req.body.password)) {
               //return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
               req.flash("LoginFallo","Autentificacion fallida. Usuario o password invalidos");
               return res.redirect("/login");
             }

              req.session.user = cliente;
              req.flash("Bienvenido","Bienvenido al sistema");
              if(cliente._secretaria){
                return res.redirect('/perfilInformacionSecretaria');
              }else if(cliente._medico){
                return res.redirect('/perfilInformacionMedico');
              }else{
                return res.redirect('/perfilInformacionCliente');
            }
           });
    }
    else{
    req.session.user = admines;
    //res.send("bienvenido admin");
    //req.session.user.bienvenido = "bienvenido a la pagina web";
    req.flash('message',"PASSWORD CORRECTO");
    res.redirect("/perfilAdmin");
    }
  }
);
}

//CAMBIAR CLAVE
exports.cambiarClaveAdmin = function(req,res){
  //var passwordActual = bcrypt.hashSync(req.body.passwordActual,10);
  req.body.password = bcrypt.hashSync(req.body.password,10);
  //req.body.passwordActual = bcrypt.hashSync(req.body.passwordActual,10);
  admin.findOne(
    {
      _id:req.session.user._id
    },
    function(err, adminEncontrado){
    if(err){
      req.flash('error',"Error en un campo");
      res.redirect("/perfilAdmin");
    }
    else{
      if(adminEncontrado.comparePassword(req.body.passwordActual)){
        admin.findOneAndUpdate({_id:req.session.user._id},{
          password: req.body.password
        },function(err, adminNuevo){
          if(err){
            req.flash('error',"Error en un campo");
            res.redirect("/perfilAdmin");
          }
          else{
            req.flash("encontrado","Contraseña cambiada");
            res.redirect("/perfilAdmin");
            }
          });
        }
      else{
          req.flash('noEncontrado',"Contraseña incorrecta");
          res.redirect("/perfilAdmin");
        };
      }
    });
}

//CAMBIAR EMAIL
exports.cambiarEmailAdmin = function(req,res){
  //var passwordActual = bcrypt.hashSync(req.body.passwordActual,10);
  //req.body.password = bcrypt.hashSync(req.body.password,10);
  //req.body.passwordActual = bcrypt.hashSync(req.body.passwordActual,10);
  admin.findOne(
    {
      _id:req.session.user._id
    },
    function(err, adminEncontrado){
    if(err){
      req.flash('error',"Error en un campo");
      res.redirect("/perfilAdmin");
    }
    else{
      if(adminEncontrado.comparePassword(req.body.passwordActual)){
        admin.findOneAndUpdate({_id:req.session.user._id},{
          email: req.body.email
        },function(err, adminNuevo){
          if(err){
            req.flash('error',"Error en un campo");
            res.redirect("/perfilAdmin");
          }
          else{
            req.flash("encontrado","Email cambiado");
            res.redirect("/perfilAdmin");
            }
          });
        }
      else{
          req.flash('noEncontrado',"Contraseña incorrecto");
          res.redirect("/perfilAdmin");
        };
      }
    });
}

//FUNCION PARA BLOQUEAR PAGINAS SI NO HAN HECHO LOGIN
exports.loginRequired = function(req, res, next) {
  //console.log("req.user: \n" );
  //console.log(req.user + "\n" );
  if (req.session.user) {
    next();
  } else {
      req.flash("Desautorizado","Registrarse para ver esta pagina primero");
      res.redirect("/login");
  }
};
//FUNCION PARA DESLOGUEARSE
exports.log_out = function(req,res){
  req.flash("Desloguearse","Usted se ha deslogueado exitosamente");
  req.session.destroy(function(){
      console.log("user logged out.")
   });
   res.redirect('/login');
}
