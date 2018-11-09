
var mongoose = require('mongoose');
//var clientes = mongoose.model('clientes');
var consulta = require("../models/consulta")();

// Display list of all mascota.
exports.listar_consultas = function(req, res) {
//    res.send('NOT IMPLEMENTED: cliente list');
consulta.find({}, function(err,consultas){
  if(err)
    res.send(err);
  res.json({"consultas":consultas});
  });
};

// Display detail page for a specific mascota.
exports.crear_una_consulta = function(req, res) {
    //res.send('NOT IMPLEMENTED: client detail: ' + req.params.id);
    var newConsulta = new consulta(req.body);
    newConsulta.save(function(err, consultas){
      if(err)
        res.send(err);
      res.json(consultas);
      //return res.redirect('/perfilMascota');
    });
};

// Display Author create form on GET.
exports.leer_una_consulta = function(req, res) {
  //  res.send('NOT IMPLEMENTED: cliente create GET');
  consulta.find({_id:req.params.consultaID},function(err, consulta){
    if(err)
      res.send(err);
    //res.json(mascota);
    res.json({"consulta":consulta});
  });
};

// Handle Author create on POST.
exports.actualizar_una_consulta = function(req, res) {
    //res.send('NOT IMPLEMENTED: cliente create POST');
    consulta.findOneAndUpdate({_id:req.params.consultaID},req.body,{new: true}, function(err, consulta){
      if(err)
        res.send(err);
      //res.json(mascota);
      res.json(consulta);
    });
};

// Display Author delete form on GET.
exports.eliminar_una_consulta = function(req, res) {
    //res.send('NOT IMPLEMENTED: cliente delete GET');
    consulta.remove({
         _id: req.params.consultaID
    },function(err, consulta){
      if(err)
        res.send(err);
      res.json({message: 'consulta eliminada exitosamente'});
    });
};
