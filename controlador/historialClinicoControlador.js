
var mongoose = require('mongoose');
//var clientes = mongoose.model('clientes');
var historialClinico = require("../models/historialClinico")();

var mascotas = require("../models/mascotas")();

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
    /*
    var newHistorialClinico = new historialClinico({
      FC : req.body.FC,
      FR : req.body.FR,
      T: req.body.T,
      linfonodos: req.body.linfonodos,
      mucosas: req.body.mucosas,
      DH: req.body.DH,
      pulso: req.body.pulso,
      TLLC: req.body.TLLC,
      palpitacionAbdominal: req.body.palpitacionAbdominal,
    });
    */
    /*
    mascotas.findOneAndUpdate({_id: req.body._mascota}, { _historialClinico: newHistorialClinico._id },{new:true}, function(err,mascota){
      if(err)
            res.send(err);
       else{
         historialClinico.findOneAndUpdate({_mascota: mascota._id},
           {
           FC : req.body.FC,
           FR : req.body.FR,
           T: req.body.T,
           linfonodos: req.body.linfonodos,
           mucosas: req.body.mucosas,
           DH: req.body.DH,
           pulso: req.body.pulso,
           TLLC: req.body.TLLC,
           palpitacionAbdominal: req.body.palpitacionAbdominal,
         }
         , { upsert: true } , function(err, historial){
           if(err)
             res.send(err);
           else{
            res.json({"historial":historial});
           //return res.redirect('/perfilMascota');
          }
         });
       }
    });
    */

         historialClinico.findOneAndUpdate({_mascota: req.body._mascota},
           {
           FC : req.body.FC,
           FR : req.body.FR,
           T: req.body.T,
           linfonodos: req.body.linfonodos,
           mucosas: req.body.mucosas,
           DH: req.body.DH,
           pulso: req.body.pulso,
           TLLC: req.body.TLLC,
           palpitacionAbdominal: req.body.palpitacionAbdominal,
         }
         , { upsert: true, new: true } , function(err, historial){
           if(err)
             res.send(err);
           else{
             mascotas.findOneAndUpdate({_id: req.body._mascota}, { _historialClinico: historial._id },{new:true}, function(err,mascota){
               if(err)
                     res.send(err);
               else{
                    req.flash("Exito","Se registro exitosamente");
                    res.redirect("/perfilMedicoIngresarHistorialClinico");
                     //res.json({"historial":historial});
               }
            }
         )};
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
