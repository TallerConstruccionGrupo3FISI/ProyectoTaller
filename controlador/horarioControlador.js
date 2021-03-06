
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
      if(err){
        req.flash("Error","No se ha creado el horario error en campos");
        res.redirect("/perfilIngresarHorarioAtencion");
      }else{
      //res.json(horario);
      req.flash("Exito","Se ha creado un horario exitosamente");
      res.redirect("/perfilIngresarHorarioAtencion");
      //return res.redirect('/perfilMascota');
      }
    });
};

// Display Author create form on GET.
exports.leer_un_horario = function(req, res) {
  //  res.send('NOT IMPLEMENTED: cliente create GET');
  var fecha = req.params.fecha;
  var thatDay = moment(fecha).startOf('day');
  var tomorrowThatDay = moment(thatDay).endOf('day');

  horarios.find( {fecha: {"$gte": thatDay, "$lt": tomorrowThatDay }})
  .populate({path: "_cita", populate: {path: "_cliente"}})
  .populate({path: "_cita", populate: {path: "_mascota"}})
  .exec(
    function(err, horario){
      if(err)
        res.send(err);
      //res.json(mascota);
      res.json({"horario":horario});
    });
};

// Handle Author create on POST.
exports.actualizar_un_horario = function(req, res) {
    //res.send('NOT IMPLEMENTED: cliente create POST');
    horarios.findOneAndUpdate({dni:req.params.fecha},req.body,{new: true}, function(err, horario){
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
         _id: req.params.fecha
    },function(err, horario){
      if(err)
        res.send(err);
      res.json({message: 'Horario eliminada exitosamente'});
    });
};
