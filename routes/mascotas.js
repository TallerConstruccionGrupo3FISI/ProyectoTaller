const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


let db = mongoose.createConnection();
var mascota = require("../models/mascotas");

console.log(mascota);
router.get('/', (req, res)=>{
  mascota.find({}, (err, mascotas)=>{
    if(err) throw err;
    console.log(mascotas);
    res.json({mascota:mascotas});
  });
});
module.exports = router;
