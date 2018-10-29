
var mongoose = require('mongoose');
//var clientes = mongoose.model('clientes');
var mascotas = require("../models/mascotas")();
var clientes = require("../models/cliente")();
// Display list of all mascota.
exports.listar_mascotas = function(req, res) {
//    res.send('NOT IMPLEMENTED: cliente list');

mascotas.find({}, function(err,mascota){
  if(err){
    res.send(err);
  }

  //console.log("\nfechaNacimiento ES " + mascota.fechaNacimiento + "\n");
  res.json({mascota});
  });
/*
mascotas.find()
.populate("_dueño")
.exec(function(err, resultados){
  if(err){
    res.send(err);
  }
    res.json({resultados: resultados});
});
*/
};

// Display detail page for a specific mascota.
exports.crear_una_mascota = function(req, res) {
    //res.send('NOT IMPLEMENTED: client detail: ' + req.params.id);
    console.log("\nEL DNI DEL USUARIO ES: " + req.session.user._id);
    console.log("\nEL BODY DEL REQUEST ES: " + req.body);

    /*
    if(req.session.user.estirilizado === "true"){
      req.session.user.estirilizado = true;
    }else{
      req.session.user.estirilizado = false;
    }

    if(req.session.user.conviveConOtrosAnimales === "true"){
      req.session.user.conviveConOtrosAnimales = true;
    }else{
      req.session.user.conviveConOtrosAnimales = false;
    }

    if(req.session.user.vacunado === "true"){
      req.session.user.vacunado = true;
    }else{
      req.session.user.vacunado = false;
    }
    */
    req.body._dueño = req.session.user._id;
    var newMascota = new mascotas(req.body);
    console.log(newMascota);

      clientes.findOneAndUpdate({_id:req.session.user._id},{ $push: { _mascotas: newMascota._id }},{new:true},function(err,cliente){
      if(err){
        return res.status(400).send({
         message: err
       });}
       else{
         newMascota.save(function(err, mascota){
           if(err){
             return res.status(400).send({
              message: err
            });}
           return res.redirect('/perfilMascota');
         });
       }
    });

    /*req.body.dni = req.session.user.dni;
    var newMascota = new mascotas(req.body);
    newMascota.save(function(err, mascota){
      if(err)
        res.send(err);
      //res.json(mascota);
      return res.redirect('/perfilMascota');
    });*/
    //res.json(req.body);
};

// Display Author create form on GET.
exports.leer_mascotas = function(req, res) {
  //  res.send('NOT IMPLEMENTED: cliente create GET');
  mascotas.find({_dueño:req.params.mascotaID},function(err, mascota){
    if(err)
      res.send(err);
    //res.json(mascota);
    res.json({"mascota":mascota});
  });
};

// Handle Author create on POST.
exports.actualizar_una_mascota = function(req, res) {
    //res.send('NOT IMPLEMENTED: cliente create POST');
    mascotas.findOneAndUpdate({_id:req.params.mascotaID},req.body,{new: true}, function(err, mascota){
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
