
function empezar_reconocimiento_de_voz() {
  window.plugins.speechrecognizer.start(devolver_con_exito, devolver_error, 5, 'es-AR');
}

function frenar_reconocimiento_de_voz(){
  window.plugins.speechrecognizer.stop(devolver_con_exito, devolver_error);
}


function devolver_con_exito(result){
  var opciones = new Array();
  var com = result.results[0][0].transcript;

  console.log(result.results[0][0].transcript);
  alert(result.results[0][0].transcript);
}

function devolver_error(error){
  console.log("ERROR: " + error.type + " - " + error.code);
  alert("ERROR: " + error.type + " - " + error.code);
}