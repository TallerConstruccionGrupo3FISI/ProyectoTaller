// AuthController.js
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config.js');
var clientes = require('../models/cliente.js')();
var expressSession = require('express-session');

//let db= require("../libs/db-connection.js")();
//var clientes = mongoose.model('clientes');

exports.registrar= function(req, res){
  var nuevoCliente = new clientes(req.body);
  console.log("Aqui va el nuevoCliente");
  console.log(nuevoCliente);
  nuevoCliente.password = bcrypt.hashSync(req.body.password,10);
  nuevoCliente.operario = false;
  nuevoCliente.administrador= false;
  nuevoCliente.save(function(err, user){
    if(err){
      return res.status(400).send({
       message: err
     });
    }
    else{
        nuevoCliente.password = undefined;
        return res.json(nuevoCliente);
    }
  });
};

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
    res.redirect('/perfilInformacionCliente');
    //res.redirect("/perfilCliente");
 });
};

exports.loginRequired = function(req, res, next) {
  //console.log("req.user: \n" );
  //console.log(req.user + "\n" );
  if (req.session.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};

exports.log_out = function(req,res){
  req.session.destroy(function(){
      console.log("user logged out.")
   });
   res.redirect('/login');
}
