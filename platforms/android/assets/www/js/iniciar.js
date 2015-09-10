var divListP = document.getElementById("divList");
var footer = document.getElementById("footer");
var iconoCancionActual;
var playPauseReproductor = document.getElementById("playPause");

// variables globales necesarias para el funcionamiento del reproductor
var media = null;
var playing = false;
var lista=[];//lista de los urls de las conciones en su respectivo orden
var listaNombres=[];//lista de los nombres en el mismo orden
var actual = null;//cancion actual
var entry;
var accion;


// --- PHONEGAP ---
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	console.log("Deviceready");
    document.getElementById("microfono").addEventListener('touchstart', empezar_reconocimiento_de_voz);
    document.getElementById("microfono").addEventListener('touchend', frenar_reconocimiento_de_voz);
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
}

function onFileSystemSuccess(fileSystem) {
    entry = fileSystem.root;
    var directoryReader = entry.createReader();
    directoryReader.readEntries(listarCanciones, failR);
    Materialize.toast('Succes getting songs', 500);
}

function fail(evt) {
    console.log("Error: "+evt.target.error.code);
}
// ------


// RECONOCIMIENTO DE VOZ
function empezar_reconocimiento_de_voz() {
	console.log("EMPIEZA");
  window.plugins.speechrecognizer.start(devolver_con_exito, devolver_error, 5, 'es-AR');
}

function frenar_reconocimiento_de_voz(){
	console.log("TERMINA");
  window.plugins.speechrecognizer.stop(devolver_con_exito, devolver_error);
}


function devolver_con_exito(result){
  //var opciones = new Array();

  function pausar() { 
    alert("Ejecutando accion pausar..."); 
  }
  function reproducir() {
    alert("Ejecutando accion reproducir..."); 
  }

  var com = result.results[0][0].transcript.toLowerCase();
  var funciones = {
    "pausa": pausar,
    "reproducir": reproducir,
  };

  /*funciones.getKeyByValue = function( value ) {
      for( var prop in this ) {
          if( this.hasOwnProperty( prop ) ) {
               if( this[ prop ] === value )
                   return prop;
          }
      }
  }*/

  if (funciones[com]) {
    funciones[com]();
  } else {
    accion = com;
    $("#comando").html(com);
    $('#guardar-comando').openModal();
  }
}

function agregarAccion(funcion) {
  funciones[accion] = funcion;
}

function devolver_error(error){
  console.log("ERROR: " + error.type + " - " + error.code);
  alert("ERROR: " + error.type + " - " + error.code);
}


// REPRODUCTOR DE MUSICA
function listarCanciones(entries) {
    var i;
    function error(err){
      console.log("ER: "+err.code);
    }

    function exito() {
      console.log("exito");
    }
    alert("1");
    var prueba = new Media("/sdcard/Download/barrilete.mp3", exito, error);
    alert("2");
    prueba.play();
    alert("3");
    
    for (i=0; i<entries.length; i++) {
        var carp=entries[i].name;
        console.log(carp);
        if (carp=="Download") {
            var directoryReader = entries[i].createReader();
            
            function list(music) {
                for (var i=0; i<music.length; i++) {
                    
                    if(music[i].isFile){
                        if (music[i].name.indexOf(".mp3") != -1){
                            divListP.innerHTML += "<li class='collection-item avatar' onclick='playNew("+i+");Materialize.toast(\"Reproduciendo\", 1000)'><i class='circle mdi-av-play-arrow blue accent-1' id='icon"+i+"'></i><span class='title truncate'>"+music[i].name+"</span><a href='#!' class='secondary-content'></a></li>";
                            console.error(music[i].name);
                            lista[i]=(music[i].toURL());
                        }
                    }
                    
                }
            }
            
            directoryReader.readEntries(list, failR);
            i=entries.length;
        }
    }
}

function failR(error) {
   console.log(error.code);
    
}


function playNew(id) {
    console.log("1");
    if (media == null){
        console.log("2");
         media = new Media(lista[id], playSucces, playError);
         console.log("3");
         footer.style.display = "block";
         document.getElementById('icon'+id).className = "mdi-editor-insert-chart circle purple accent-1"; 
         iconoCancionActual = document.getElementById('icon'+id);
         console.log("4");
         media.play();
         console.log("5");
         playing = true;
         actual = id;
         
      }
      else {
        stop();
        playNew(id);

      }
      
    
}

function playPause() {
    var temp = playing;
    if (temp == true){

        playing = false;
        playPauseReproductor.className = "medium mdi-av-play-arrow white-text";
        media.pause();
       
        
        
    }
    if (temp == false) {

        playing = true;
        playPauseReproductor.className = "medium mdi-av-pause white-text";
        media.play();
        
    }
}
function stop(){
    if (media){
        iconoCancionActual.className = "circle mdi-av-play-arrow blue accent-1";
        footer.style.display = "none";
        media.stop();
        media.release();
        media = null;
    }
    else{

    }            
}

function playSucces() {
    console.log("<br>funciona play");
}
function playError(error) {
    console.log( "<br>error --> "+ error.code);
}  


function next(){
    actual = actual + 1;
    stop()
    playNew(actual);
}
function prev(){
    actual = actual - 1;
    stop();
    playNew(actual);
}
