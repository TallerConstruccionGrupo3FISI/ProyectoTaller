
var mongoose = require('mongoose');
//var clientes = mongoose.model('clientes');
var clientes = require("../models/cliente")();

// Display list of all clientes.
exports.listar_clientes = function(req, res) {
//    res.send('NOT IMPLEMENTED: cliente list');
clientes.find({}, function(err,cliente){
  if(err)
    res.send(err);
  res.json(cliente);
  });
};

// Display detail page for a specific client.
exports.crear_un_cliente = function(req, res) {
    //res.send('NOT IMPLEMENTED: client detail: ' + req.params.id);
    var newCliente = new clientes(req.body);
    newCliente.save(function(err, cliente){
      if(err)
        res.send(err);
      res.json(cliente);
    });
};

// Display Author create form on GET.
exports.leer_un_cliente = function(req, res) {
  //  res.send('NOT IMPLEMENTED: cliente create GET');
  clientes.find({dni:req.params.clienteID},function(err, cliente){
    if(err)
      res.send(err);
    res.json(cliente);
  });
};

// Handle Author create on POST.
exports.actualizar_un_cliente = function(req, res) {
    //res.send('NOT IMPLEMENTED: cliente create POST');
    console.log("el body de actualizar es: " + req.body);
    clientes.findOneAndUpdate({dni:req.params.clienteID},req.body,{new: true}, function(err, cliente){
      if(err)
        res.send(err);
      res.json(cliente);
    });
};

// Display Author delete form on GET.
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
