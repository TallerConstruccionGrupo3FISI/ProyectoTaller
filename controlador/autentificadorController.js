// AuthController.js
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config.js');
var clientes = require('../models/cliente.js')();
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
    localStorage.setItem("token",jwt.sign({ email: cliente.email, fullName: cliente.apellidos, _id: cliente._id }, 'RESTFULAPIs'));
    //res.json({ token: jwt.sign({ email: cliente.email, fullName: cliente.apellidos, _id: cliente._id }, 'RESTFULAPIs') });
    console.log(localStorage.getItem("token"));
    //return res.json({token: localStorage.getItem("token")});
    res.redirect("/perfilCliente");
    res.render("perfilCliente");
 });
};



exports.loginRequired = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};
