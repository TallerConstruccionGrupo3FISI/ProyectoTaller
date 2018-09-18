const express = require('express');
const router = express.Router();
let db = require('../libs/db-connection.js')();
var perro = require('../models/perro')();

db.once('open', function() {
  console.log("CONECTADO A LA BD");
});

router.get("/", (req,res)=>{
    perro.find({}, (err, perros)=>{
      if(err) throw err;
      console.log(perros);
      res.render('index',{
      title: "titulos",
      perro: perros
      });
    });
});
module.exports = router;
