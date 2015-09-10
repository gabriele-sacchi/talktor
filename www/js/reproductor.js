document.addEventListener("deviceready", onDeviceReady, false);
            
           
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







function onDeviceReady() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);

    console.log("device is ready");
}



function fail(evt) {
    console.log(evt.target.error.code);
}





function failR(error) {
    console.log(error.code);
}
           

function onFileSystemSuccess(fileSystem) {
    entry = fileSystem.root;
    var directoryReader = entry.createReader();
    directoryReader.readEntries(listarCanciones,failR);
    Materialize.toast('Succes getting songs', 500);
}


function listarCanciones(entries) {
    var i;
    console.log("ENTRIES: "+entries);
    console.log("ENTRIES-keys: "+Object.keys(entries));
    
    for (i=0; i<entries.length; i++) {
        var carp=entries[i].name;
        console.log(carp);
        if (carp=="Music") {
            var directoryReader = entries[i].createReader();
            
            function list(music) {
                for (var i=0; i<music.length; i++) {
                    
                    if(music[i].isFile){
                        if (music[i].name.indexOf(".mp3") != -1){
                            divListP.innerHTML += "<li class='collection-item avatar' onclick='playNew("+i+")'  Materialize.toast('playing', 1000);'><i class='material-icons circle mdi-av-play-arrow blue accent-1' id='icon"+i+"'></i><span class='title truncate'>"+music[i].name+"</span><a href='#!' class='secondary-content'></a></li>";
                            
                            lista[i]=(music[i].toURL());
                        }
                    }
                    
                }
            }
            
            directoryReader.readEntries(list, failR);
            i=entries.length;
        }
    }
    
/*                for (i=0; i<entries.length; i++) {
        console.log(entries[i].name);
        if(entries[i].isFile){
            if (entries[i].name.indexOf(".mp3") != -1){
                divListP.innerHTML += "<li class='collection-item avatar' onclick='playNew("+i+")'  Materialize.toast('playing', 1000);'><i class='material-icons circle mdi-av-play-arrow blue accent-1' id='icon"+i+"'></i><span class='title truncate'>"+entries[i].name+"</span><a href='#!' class='secondary-content'></a></li>";
                
                
                lista[i]=(entries[i].toURL());
                
                               
            ;}
        }
        if (entries[i].isDirectory) {
             
             var directoryReader = entries[i].createReader();
             
             directoryReader.readEntries(listarCanciones, failR);
        }
        
    }*/
    
}

function failR(error) {
   console.log(error.code);
    
}



function playNew(id) {
    if (media == null){
         media = new Media(lista[id], playSucces, playError);
         footer.style.display = "block";
         document.getElementById('icon'+id).className = "material-icons circle mdi-editor-insert-chart circle purple accent-1"; 
         iconoCancionActual = document.getElementById('icon'+id);
         media.play();
         playing = true;
         actual = id;
         
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
        iconoCancionActual.className = "material-icons circle mdi-av-play-arrow blue accent-1";
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
