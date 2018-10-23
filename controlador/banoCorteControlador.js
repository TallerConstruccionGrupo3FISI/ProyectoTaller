
var mongoose = require('mongoose');
//var clientes = mongoose.model('clientes');
var banoCorte = require("../models/banoCorte")();

// Display list of all mascota.
exports.listar_banoCorte = function(req, res) {
//    res.send('NOT IMPLEMENTED: cliente list');
banoCorte.find({}, function(err,banoCorte){
  if(err)
    res.send(err);
  res.json({"banoCorte":banoCorte});
  });
};

// Display detail page for a specific mascota.
exports.crear_un_banoCorte = function(req, res) {
    //res.send('NOT IMPLEMENTED: client detail: ' + req.params.id);
    var newBanoCorte = new banoCorte(req.body);
    newBanoCorte.save(function(err, banoCorte){
      if(err)
        res.send(err);
      res.json(banoCorte);
      //return res.redirect('/perfilMascota');
    });
};

// Display Author create form on GET.
exports.leer_un_banoCorte = function(req, res) {
  //  res.send('NOT IMPLEMENTED: cliente create GET');
  banoCorte.find({_id:req.params.banoCorteID},function(err, banoCorte){
    if(err)
      res.send(err);
    //res.json(mascota);
    res.json({"banoCorte":banoCorte});
  });
};

// Handle Author create on POST.
exports.actualizar_un_banoCorte= function(req, res) {
    //res.send('NOT IMPLEMENTED: cliente create POST');
    banoCorte.findOneAndUpdate({_id:req.params.banoCorteID},req.body,{new: true}, function(err, banoCorte){
      if(err)
        res.send(err);
      //res.json(mascota);
      res.json(banoCorte);
    });
};

// Display Author delete form on GET.
exports.eliminar_un_banoCorte = function(req, res) {
    //res.send('NOT IMPLEMENTED: cliente delete GET');
    banoCorte.remove({
         _id: req.params.banoCorteID
    },function(err, banoCorte){
      if(err)
        res.send(err);
      res.json({message: 'banoCorte eliminado exitosamente'});
    });
};
