
var mongoose = require('mongoose');
//var clientes = mongoose.model('clientes');
var secretaria = require("../models/secretaria")();

// Display list of all mascota.
exports.listar_secretarias = function(req, res) {
//    res.send('NOT IMPLEMENTED: cliente list');
secretaria.find({}, function(err,secretaria){
  if(err)
    res.send(err);
  res.json({"secretaria":secretaria});
  });
};

// Display detail page for a specific mascota.
exports.crear_una_secretaria = function(req, res) {
    //res.send('NOT IMPLEMENTED: client detail: ' + req.params.id);
    var newSecretaria = new secretaria(req.body);
    newSecretaria.save(function(err, secretaria){
      if(err)
        res.send(err);
      res.json(secretaria);
      //return res.redirect('/perfilMascota');
    });
};

// Display Author create form on GET.
exports.leer_una_secretaria = function(req, res) {
  //  res.send('NOT IMPLEMENTED: cliente create GET');
  secretaria.find({_id:req.params.secretariaID},function(err, secretaria){
    if(err)
      res.send(err);
    //res.json(mascota);
    res.json({"secretaria":secretaria});
  });
};

// Handle Author create on POST.
exports.actualizar_una_secretaria = function(req, res) {
    //res.send('NOT IMPLEMENTED: cliente create POST');
    secretaria.findOneAndUpdate({_id:req.params.secretariaID},req.body,{new: true}, function(err, secretaria){
      if(err)
        res.send(err);
      //res.json(mascota);
      res.json(secretaria);
    });
};

// Display Author delete form on GET.
exports.eliminar_una_secretaria= function(req, res) {
    //res.send('NOT IMPLEMENTED: cliente delete GET');
    secretaria.remove({
         _id: req.params.secretariaID
    },function(err, secretaria){
      if(err)
        res.send(err);
      res.json({message: 'Horario eliminada exitosamente'});
    });
};
