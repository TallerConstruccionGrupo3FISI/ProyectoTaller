
var mongoose = require('mongoose');
//var clientes = mongoose.model('clientes');
var clientes = require("../models/cliente")();

// Display list of all clientes.
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
  find({}).
  populate('mascotas').
  exec(function (err, cliente) {
    if (err) return handleError(err);
    res.json(cliente);
    //console.log('The author is %s', story.author.name);
    // prints "The author is Ian Fleming"
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
  /*
  clientes.find({dni:req.params.clienteID},function(err, cliente){
    if(err)
      res.send(err);
    res.json(cliente);
  });
*/
  clientes.
  find({dni:req.params.clienteID}).
  populate('mascotas').
  exec(function (err, cliente) {
    if (err) return handleError(err);
    res.json(cliente);
  });
};

// Handle Author create on POST.
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
