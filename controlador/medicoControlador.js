
var mongoose = require('mongoose');
//var clientes = mongoose.model('clientes');
var medico = require("../models/medico")();

// Display list of all mascota.
exports.listar_medicos = function(req, res) {
//    res.send('NOT IMPLEMENTED: cliente list');
medico.find({}, function(err,medico){
  if(err)
    res.send(err);
  res.json({"medico":medico});
  });
};

// Display detail page for a specific mascota.
exports.crear_un_medico = function(req, res) {
    //res.send('NOT IMPLEMENTED: client detail: ' + req.params.id);
    var newMedico = new medico(req.body);
    newMedico.save(function(err, medico){
      if(err)
        res.send(err);
      res.json(medico);
      //return res.redirect('/perfilMascota');
    });
};

// Display Author create form on GET.
exports.leer_un_medico = function(req, res) {
  //  res.send('NOT IMPLEMENTED: cliente create GET');
  medico.find({_id:req.params.medicoID},function(err, medico){
    if(err)
      res.send(err);
    //res.json(mascota);
    res.json({"medico":medico});
  });
};

// Handle Author create on POST.
exports.actualizar_un_medico = function(req, res) {
    //res.send('NOT IMPLEMENTED: cliente create POST');
    medico.findOneAndUpdate({_id:req.params.medicoID},req.body,{new: true}, function(err, medico){
      if(err)
        res.send(err);
      //res.json(mascota);
      res.json(medico);
    });
};

// Display Author delete form on GET.
exports.eliminar_un_medico = function(req, res) {
    //res.send('NOT IMPLEMENTED: cliente delete GET');
    medico.remove({
         _id: req.params.medicoID
    },function(err, medico){
      if(err)
        res.send(err);
      res.json({message: 'Horario eliminada exitosamente'});
    });
};
