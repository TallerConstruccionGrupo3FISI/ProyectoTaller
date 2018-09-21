const express = require('express');
const router = express.Router();
let db = require('../libs/db-connection.js')();
var cliente = require("../models/cliente")();

/*
db.once('open', function() {
  console.log("CONECTADO A LA BD");
});
*/
router.get('/', (req, res)=>{
  cliente.find( {}, (err, clientes)=>{
    if(err) throw err;
    res.render('listaClientes',{
      clientes: clientes
    }
    );
  });
});

router.post('/', async (req, res)=>{
    //const clienteWeb= cliente(req.body);
    let body = req.body;
    body.operario = false;
    body.administrador= false;
    console.log("cuerpo de log:");
    console.log(body);
    cliente.create(body, (err, cli)=>{
        if(err) throw err;
        res.send("SE AGREGO SATISFACTORIAMENTE");
    });
});



module.exports = router;
