const express = require('express');
const keys = require('../config/keys.js');
const stripe = require('stripe')(keys.stripeSecretKey);

const router = express.Router();

// Index Route

router.post('/', (req, res) => {
  const amount = 20.00;

  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer => stripe.charges.create({
    amount,
    description: 'cita para consulta',
    currency: 'soles',
    customer: customer.id
  }))
  .then(charge => res.render('perfilInformacionCliente'));
});


module.exports = router;
