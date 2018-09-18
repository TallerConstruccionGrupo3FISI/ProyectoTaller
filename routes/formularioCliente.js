const express = require('express');
const router = express.Router();
let db = require('../libs/db-connection.js')();


db.once('open', function() {
  console.log("CONECTADO A LA BD");
});

router.get("/formularioCliente", (req,res)=>{
    res.render("formularioCliente");
});
module.exports = router;
