
var mongoose = require('mongoose');
//var clientes = mongoose.model('clientes');
var historialClinico = require("../models/historialClinico")();

// Display list of all mascota.
exports.listar_historialClinico = function(req, res) {
//    res.send('NOT IMPLEMENTED: cliente list');
historialClinico.find({}, function(err,historialClinico){
  if(err)
    res.send(err);
  res.json({"historialClinico":historialClinico});
  });
};

// Display detail page for a specific mascota.
exports.crear_un_historialClinico = function(req, res) {
    //res.send('NOT IMPLEMENTED: client detail: ' + req.params.id);
    var newHistorialClinico = new historialClinico(req.body);
    newHistorialClinico.save(function(err, historialClinico){
      if(err)
        res.send(err);
      res.json(historialClinico);
      //return res.redirect('/perfilMascota');
    });
};

// Display Author create form on GET.
exports.leer_un_historialClinico = function(req, res) {
  //  res.send('NOT IMPLEMENTED: cliente create GET');
  historialClinico.find({_id:req.params.historialClinicoID},function(err, historialClinico){
    if(err)
      res.send(err);
    //res.json(mascota);
    res.json({"historialClinico":historialClinico});
  });
};

// Handle Author create on POST.
exports.actualizar_un_historialClinico = function(req, res) {
    //res.send('NOT IMPLEMENTED: cliente create POST');
    historialClinico.findOneAndUpdate({dni:req.params.historialClinicoID},req.body,{new: true}, function(err, historialClinico){
      if(err)
        res.send(err);
      //res.json(mascota);
      res.json(historialClinico);
    });
};

// Display Author delete form on GET.
exports.eliminar_un_historialClinico = function(req, res) {
    //res.send('NOT IMPLEMENTED: cliente delete GET');
    historialClinico.remove({
         _id: req.params.historialClinicoID
    },function(err, historialClinico){
      if(err)
        res.send(err);
      res.json({message: 'Horario eliminada exitosamente'});
    });
};
