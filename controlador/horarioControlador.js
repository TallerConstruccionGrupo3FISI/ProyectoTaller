
var mongoose = require('mongoose');
//var clientes = mongoose.model('clientes');
var horarios = require("../models/horarios")();
var moment = require("moment");
// Display list of all mascota.
exports.listar_horarios = function(req, res) {
//    res.send('NOT IMPLEMENTED: cliente list');
/*
horarios.find({}, function(err,horario){
  if(err)
    res.send(err);
  res.json({horario});
  });
*/
horarios.
find({}).
populate({path: "_cita", populate: {path: "_cliente"}}).
exec(function(err,horario){
  if(err)
      res.send(err);
  res.json({horario});
});
};

// Display detail page for a specific mascota.
exports.crear_un_horario = function(req, res) {
    //res.send('NOT IMPLEMENTED: client detail: ' + req.params.id);

    var newHorarios = new horarios(req.body);
    newHorarios.save(function(err, horario){
      if(err)
        res.send(err);
      res.json(horario);
      //return res.redirect('/perfilMascota');
    });
};

// Display Author create form on GET.
exports.leer_un_horario = function(req, res) {
  //  res.send('NOT IMPLEMENTED: cliente create GET');
  horarios.find({_id:req.params.horarioID},function(err, horario){
    if(err)
      res.send(err);
    //res.json(mascota);
    res.json({"horario":horario});
  });
};

// Handle Author create on POST.
exports.actualizar_un_horario = function(req, res) {
    //res.send('NOT IMPLEMENTED: cliente create POST');
    horarios.findOneAndUpdate({dni:req.params.horarioID},req.body,{new: true}, function(err, horario){
      if(err)
        res.send(err);
      //res.json(mascota);
      res.json(horario);
    });
};

exports.horario_hoy = function(req, res){
  var today = moment().startOf('day')
  var tomorrow = moment(today).endOf('day')

  horarios.find({fecha: {"$gte": today, "$lt": tomorrow } },function(err,horario){
    if(err)
        res.send(err);
    res.json({"horario":horario});
  });
};

// Display Author delete form on GET.
exports.eliminar_un_horario = function(req, res) {
    //res.send('NOT IMPLEMENTED: cliente delete GET');
    horarios.remove({
         _id: req.params.horarioID
    },function(err, horario){
      if(err)
        res.send(err);
      res.json({message: 'Horario eliminada exitosamente'});
    });
};
