const express = require('express');
const router = express.Router();
let db = require('../libs/db-connection.js')();
var mascota = require("../models/mascotas")();

/*
db.once('open', function() {
  console.log("CONECTADO A LA BD");
});
*/
console.log(mascota);
router.get('/', (req, res)=>{
  mascota.find({}, (err, mascotas)=>{
    if(err) throw err;
    console.log(mascotas);
    res.json({mascota:mascotas});
  });
});
module.exports = router;
