
var mongoose = require('mongoose');
//var clientes = mongoose.model('clientes');
var cita = require("../models/cita")();
var cliente = require("../models/cliente")();
var mascota = require("../models/mascotas")();
// Display list of all mascota.
exports.listar_citas = function(req, res) {
//    res.send('NOT IMPLEMENTED: cliente list');
/*
cita.find({}, function(err,citas){
  if(err)
    res.send(err);
  res.json({"cita":citas});
  });
  */
  cita.find({})
  .populate('_mascota')
  .populate('_horario')
  .populate('_cliente')
  .exec(function (err, resultados){
    if(err)
      res.send(err);
    res.json({"cita":resultados});
  });
};

exports.crear_una_cita = function(req, res) {

    var newCita = new cita(req.body);
    newCita.save(function(err, citas){
      if(err)
        res.send(err);
      res.json(citas);
      //return res.redirect('/perfilMascota');
    });
};

// Display Author create form on GET.
exports.leer_una_cita= function(req, res) {
  //  res.send('NOT IMPLEMENTED: cliente create GET');
  /*cita.find({_id:req.params.citaID},function(err, citas){
    if(err)
      res.send(err);
    //res.json(mascota);
    res.json({"cita":citas});
  });*/
  console.log("EL PARAETRO DE CITA ES : " + req.params.citaID );
  cita.find( { "_cliente":  req.params.citaID })
  .populate('_mascota')
  .populate('_horario')
  .populate('_cliente')
  .exec(function (err, resultados){
    if(err)
      res.send(err);
    res.json({"cita":resultados});
  });
};

// Handle Author create on POST.
exports.actualizar_una_cita = function(req, res) {
    //res.send('NOT IMPLEMENTED: cliente create POST');
    cita.findOneAndUpdate({_id:req.params.citaID},req.body,{new: true}, function(err, citas){
      if(err)
        res.send(err);
      //res.json(mascota);
      res.json(citas);
    });
};

// Display Author delete form on GET.
exports.eliminar_una_cita = function(req, res) {
    //res.send('NOT IMPLEMENTED: cliente delete GET');
    cita.remove({
         _id: req.params.citaID
    },function(err, citas){
      if(err)
        res.send(err);
      res.json({message: 'Cita eliminada exitosamente'});
    });
};
