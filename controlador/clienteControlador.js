
var mongoose = require('mongoose');
//var clientes = mongoose.model('clientes');
var clientes = require("../models/cliente")();

// MUESTRA UNA LISTA DE TODOS LOS CLIENTES
exports.listar_clientes = function(req, res) {
//    res.send('NOT IMPLEMENTED: cliente list');
/*
clientes.find({}, function(err,cliente){
  if(err)
    res.send(err);
  res.json(cliente);
  });
  */
  clientes.
  find({_secretaria: null, _medico: null}).
  populate('_mascotas').
  exec(function (err, cliente) {
    if (err) return handleError(err);
    res.json({"clientes":cliente});
    //console.log('The author is %s', story.author.name);
    // prints "The author is Ian Fleming"
  });
};

exports.listar_clientes_secretaria = function(req,res){
  clientes.
  find({"_secretaria": { $exists: true, $ne: null}}).
  populate('_mascotas').
  exec(function (err, cliente) {
    if (err) return handleError(err);
    res.json(cliente);
    //console.log('The author is %s', story.author.name);
    // prints "The author is Ian Fleming"
  });
};

exports.listar_clientes_medico = function(req,res){
  clientes.
  find({"_medico": { $exists: true, $ne: null}}).
  populate('_mascotas').
  exec(function (err, cliente) {
    if (err) return handleError(err);
    res.json(cliente);
    //console.log('The author is %s', story.author.name);
    // prints "The author is Ian Fleming"
  });
};


//CREAR UN CLIENTE EN MONGO
exports.crear_un_cliente = function(req, res) {
    //res.send('NOT IMPLEMENTED: client detail: ' + req.params.id);
    var newCliente = new clientes(req.body);
    newCliente.save(function(err, cliente){
      if(err)
        res.send(err);
      res.json(cliente);
    });
};

//LEE UN CLIENTE Y TE LO REGRESA
exports.leer_un_cliente = function(req, res) {
  //  res.send('NOT IMPLEMENTED: cliente create GET');
  /*
  clientes.find({dni:req.params.clienteID},function(err, cliente){
    if(err)
      res.send(err);
    res.json(cliente);
  });
*/
  clientes.
  find({dni:req.params.clienteID}).
  populate('_mascotas').
  exec(function (err, cliente) {
    if (err) return handleError(err);
    res.json(cliente);
  });
};

//ACTUALIZAR UN CLIENTE
exports.actualizar_un_cliente = function(req, res) {
    //res.send('NOT IMPLEMENTED: cliente create POST');
    console.log(req.body);
    console.log("el valor de param.clienteID: " + req.params.clienteID);
    clientes.findOneAndUpdate({_id:req.session.user._id},req.body, function(err, cliente){
      if(err){
        return res.status(400).send({
         message: err
       });}
      res.json({"cliente": cliente});
    });
    //req.body.fechaNacimiento = new Date(req.body.fechaNacimiento).toJSON;
    //req.body.fechaNacimiento = new Date(req.body.fechaNacimiento);
};

//ELIMINAR UN CLIENTE
exports.eliminar_un_cliente = function(req, res) {
    //res.send('NOT IMPLEMENTED: cliente delete GET');
    clientes.remove({
         dni: req.params.clienteID
    },function(err, clientes){
      if(err)
        res.send(err);
      res.json({message: 'Cliente eliminado exitosamente'});
    });
};
