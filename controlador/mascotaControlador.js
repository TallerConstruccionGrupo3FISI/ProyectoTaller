
var mongoose = require('mongoose');
//var clientes = mongoose.model('clientes');
var mascotas = require("../models/mascotas")();

// Display list of all mascota.
exports.listar_mascotas = function(req, res) {
//    res.send('NOT IMPLEMENTED: cliente list');
mascotas.find({}, function(err,mascota){
  if(err)
    res.send(err);
  res.json({"mascota":mascota});
  });
};

// Display detail page for a specific mascota.
exports.crear_una_mascota = function(req, res) {
    //res.send('NOT IMPLEMENTED: client detail: ' + req.params.id);
    console.log("\nEL DNI DEL USUARIO ES: " + req.session.user.dni);
    console.log("\nEL BODY DEL REQUEST ES: " + req.body);
    req.body.dni = req.session.user.dni;
    var newMascota = new mascotas(req.body);
    newMascota.save(function(err, mascota){
      if(err)
        res.send(err);
      res.json(mascota);
    });
};

// Display Author create form on GET.
exports.leer_mascotas = function(req, res) {
  //  res.send('NOT IMPLEMENTED: cliente create GET');
  mascotas.find({dni:req.params.mascotaID},function(err, mascota){
    if(err)
      res.send(err);
    //res.json(mascota);
    res.json({"mascota":mascota});
  });
};

// Handle Author create on POST.
exports.actualizar_una_mascota = function(req, res) {
    //res.send('NOT IMPLEMENTED: cliente create POST');
    mascotas.findOneAndUpdate({dni:req.params.mascotaID},req.body,{new: true}, function(err, mascota){
      if(err)
        res.send(err);
      res.json(mascota);
    });
};

// Display Author delete form on GET.
exports.eliminar_una_mascota = function(req, res) {
    //res.send('NOT IMPLEMENTED: cliente delete GET');
    mascotas.remove({
         dni: req.params.mascotaID
    },function(err, mascota){
      if(err)
        res.send(err);
      res.json({message: 'Mascota eliminada exitosamente'});
    });
};
