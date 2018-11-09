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
//let db= require("../libs/db-connection.js")();
//var clientes = mongoose.model('clientes');

//FUNCION PARA REGISTRAR A UN CLIENTE
exports.registrar= function(req, res){
  var nuevoCliente = new clientes(req.body);
  nuevoCliente.password = bcrypt.hashSync(req.body.password,10);
  nuevoCliente.save(function(err){
    if(err){
      return res.status(400).send({
       message: err
     });
    }
    else{
        //res.json(nuevoCliente);
        req.session.user = nuevoCliente;
        return res.redirect('/perfilInformacionCliente');
    }
  });
};

//FUNCION PARA REGISTRAR UN MEDICO
exports.registrar_medico= function(req, res){
  var nuevoCliente = new clientes(req.body);
  nuevoCliente.password = bcrypt.hashSync(req.body.password,10);

  var medico = new medicos({
    _cliente : nuevoCliente._id,
    especialidad: "cirujano en proceso",
    cargo: "jefazo",
    _horario: []
  });
  nuevoCliente._medico = medico._id;

  nuevoCliente.save(function(err){
    if(err){
      return res.status(400).send({
       message: err
     });}
    else{
        medico.save(function(err) {
          if(err){
            return res.status(400).send({
             message: err
           });
          }
      });
        res.json(nuevoCliente);
    }
  });
};

//FUNCION PARA REGISTRAR UNA SECRETARIA
exports.registrar_secretaria= function(req, res){
  var nuevoCliente = new clientes(req.body);
  var secretaria = new secretarias({
    _cliente: nuevoCliente._id,
    _horario: []
  });
  nuevoCliente.password = bcrypt.hashSync(req.body.password,10);
  nuevoCliente._secretaria = secretaria._id;
  nuevoCliente.save(function(err, user){
    if(err){
      return res.status(400).send({
       message: err
     });
    }
    else{
        secretaria.save(function(err){
          if(err){
            return res.status(400).send({
              message: err
            });
          }
        });
        res.json(nuevoCliente);
        }
  });
};


//FUNCION PARA VALIDAR EL LOGIN
exports.sign_in = function(req, res) {
  console.log("aqui va el request");
  console.log(req.body);
  clientes.findOne({
   email: req.body.email
 }, function(err, cliente) {
   if (err) throw err;
   if (!cliente || !cliente.comparePassword(req.body.password)) {
     return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
   }
    //localStorage.setItem("token",jwt.sign({ email: cliente.email, fullName: cliente.apellidos, dni: cliente.dni }, 'RESTFULAPIs',{ expiresIn: '1h' }));
    //var token =  jwt.sign({ email: cliente.email, fullName: cliente.apellidos, dni: cliente.dni }, 'RESTFULAPIs',{ expiresIn: '1h' });
    //res.set("authorization","JWT " + token);
    //res.json(token);
    //var token = localStorage.getItem("token");
    //console.log("\nEL TOKEN ES: " + token + "\n");
    //res.cookie('id_token' ,token);
    req.session.user = cliente;
    if(cliente._secretaria){
      res.redirect('/perfilInformacionSecretaria');
    }else if(cliente._medico){
      res.redirect('/perfilInformacionMedico');
    }else{
      res.redirect('/perfilInformacionCliente');
  }
 });
};

//FUNCION PARA BLOQUEAR PAGINAS SI NO HAN HECHO LOGIN
exports.loginRequired = function(req, res, next) {
  //console.log("req.user: \n" );
  //console.log(req.user + "\n" );
  if (req.session.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};
//FUNCION PARA DESLOGUEARSE
exports.log_out = function(req,res){
  req.session.destroy(function(){
      console.log("user logged out.")
   });
   res.redirect('/login');
}
