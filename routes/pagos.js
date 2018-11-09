const express = require('express');
const keys = require('../config/keys.js');
const stripe = require('stripe')(keys.stripeSecretKey);
const cita = require("../models/cita")();
const router = express.Router();
var horarios = require("../models/horarios")();

// Index Route

router.post('/', (req, res) => {
  const amount = 1000;
  /*
  console.log("AQUI LLEGAN LOS PARAMETROS");
  console.log("req.body._mascota:" + req.body._mascota);
  console.log("req.body._horario:" + req.body._horario);
  console.log("req.body.motivo:" + req.body.motivo);
  console.log("Finalizan los parametros");
  */
  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer => stripe.charges.create({
    amount,
    description: 'cita para consulta',
    currency: 'pen',
    customer: customer.id
  }))
  .then(charge =>{
    //console.log(charge);
    var newCita = new cita({
      _mascota: req.body._mascota,
      _horario: req.body._horario,
      _cliente: req.session.user._id,
      motivo: req.body.motivo,
      estado: "pagado",
      tipo: "consulta"});
      //res.json(citas);
      //res.render('perfilInformacionCliente');
      //return res.redirect('/perfilMascota');
          horarios.findOneAndUpdate({_id: newCita._horario},{ $push: { _cita: newCita._id }},{new:true},function(err,horario){
            if(err){
              return res.status(400).send({
               message: err
             });}
             else{
               newCita.save(function(err, cita){
                 if(err){
                   return res.status(400).send({
                    message: err
                  });}
                 return res.redirect('/perfilInformacionCliente');
               });
             }
          });
    }
  );
});


module.exports = router;
