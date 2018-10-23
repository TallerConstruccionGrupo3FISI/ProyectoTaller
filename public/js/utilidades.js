$(document).ready(function() {
    $("#add").click(function() {
    		var lastField = $("#enfermedades div:last");
        var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
        var fieldWrapper = $("<div class=\"input-group\" id=\"field"+ intId + "\"></div>");
        fieldWrapper.data("idx", intId);
        var inputEnfermedad = $("<input name=\"enfermedad\" class=\"form-control here\"  placeholder=\"Enfermedades diagnosticadas " + intId +  "\" class=\"form-control here\" required=\"required\" type=\"text\" id=\"mascota_enfermedad" + intId + "\"/>");
        var removeButton =  $("<input type=\"button\" value=\"Borrar\" class=\"minus\" />");
        removeButton.click(function(){
          $(this).parent().remove();
        });

        fieldWrapper.append(inputEnfermedad);
        fieldWrapper.append(removeButton);
        $("#enfermedades").append(fieldWrapper);
    });
});

var fechaToString = function(data){
  var fecha = new Date(data);
  var dia = fecha.getDate();
  var mes = fecha.getMonth();
  var ano = fecha.getFullYear();
  var stringFecha = (dia+1) + "-" + (mes+1) + "-" + ano;
  return stringFecha;
}
