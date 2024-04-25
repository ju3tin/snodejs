import * as THREE from 'three';

import {FBXLoader} from 'three/addons/loaders/FBXLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { Vector3 } from 'three';
import Stats from 'three/addons/libs/stats.module.js';
init();

function init() {
  
let fbxModel;

//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var gumStream; 						//stream from getUserMedia()
var rec; 							//Recorder.js object
var input; 							//MediaStreamAudioSourceNode we'll be recording

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext //audio context to help us record

var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");
var pauseButton = document.getElementById("pauseButton");


//add events to those 2 buttons
recordButton.addEventListener("click", startRecording);

stopButton.addEventListener("click", stopRecording);
pauseButton.addEventListener("click", pauseRecording);

var scrollTimer = -1;


var voice = {
  // (A) INIT SPEECH RECOGNITION
  sform : null, // html search form
  sfield : null, // html search field
  sbtn : null, // html voice search button
  recog : null, // speech recognition object
  init : () => {
    // (A1) GET HTML ELEMENTS
    voice.sfrom = document.getElementById("search-form");
    voice.sfield = document.getElementById("search-field");
    voice.sbtn = document.getElementById("search-speech");
 
    // (A2) GET MICROPHONE ACCESS
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      // (A3) SPEECH RECOGNITION OBJECT + SETTINGS
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      voice.recog = new SpeechRecognition();
      voice.recog.lang = "en-US";
      voice.recog.continuous = false;
      voice.recog.interimResults = false;
 
      // (A4) POPUPLATE SEARCH FIELD ON SPEECH RECOGNITION
      voice.recog.onresult = evt => {
        let said = evt.results[0][0].transcript.toLowerCase();
        voice.sfield.value = said;
        
        // voice.sform.submit();
        // OR RUN AN AJAX/FETCH SEARCH
        voice.stop();
        console.log(said);
        
        const xhr = new XMLHttpRequest();
xhr.open("GET", `https://apps.emersa.io:8082/dude123a/${said}`);
xhr.send();
xhr.responseType = "json";
xhr.onload = () => {
  if (xhr.readyState == 4 && xhr.status == 200) {
    console.log(xhr.response);
  //  console.log(xhr.response.traits.text[0].value);
    var obj = xhr.response;
		//console.log(JSON.stringify(obj.traits));
    //    var objlength = JSON.stringify(obj.traits);
    //  var obj = JSON.parse(this.responseText);
console.log(obj);
console.log(obj.textList);
//console.log(JSON.stringify(obj.traits));
var objlength = obj.textList;
var obj1q = obj.textList;
    /*    if (obj.filter(company => company.Name === 'Magenic').length ) {
  console.log('I contain Magenic');
}*/
        var obj1q = JSON.stringify(xhr.response);
        if (objlength.length < 1) {
		var objecttext = "I'm sorry, but I didn't understand the question. Please try again";
		console.log(objecttext+'dfgdfgdfgdfgdgdgdgdgf'); 
        }else { var objecttext = obj.textList};
        const listener = new THREE.AudioListener();
		camera.add( listener );
		const sound = new THREE.Audio( listener );
		const audioLoader = new THREE.AudioLoader();
		audioLoader.load( `{{ site.apilink2 }}${objecttext}`, function( buffer ) {
		sound.setBuffer( buffer );
		sound.setLoop( false );
		sound.setVolume( 1 );
		sound.play();
		const analyser1 = new THREE.AudioAnalyser( sound, 32 );
		}); 
  } else {
    console.log(`Error: ${xhr.status}`);
  }
};


      };
 
      // (A5) ON SPEECH RECOGNITION ERROR
      voice.recog.onerror = err => console.error(err);
 
      // (A6) READY!
      voice.sbtn.disabled = false;
      voice.stop();
    })
    .catch(err => {
      console.error(err);
      voice.sbtn.value = "Please enable access and attach microphone.";
    });
  },
 
  // (B) START SPEECH RECOGNITION
  start : () => {
    voice.recog.start();
    voice.sbtn.onclick = voice.stop;
    const sample = document.getElementById("search-speech");
    sample.style.background = `url('https://api.iconify.design/ph/microphone-fill.svg?color=red&height=24') center no-repeat`; 
    voice.sbtn.value = "";
  },
 
  // (C) STOP/CANCEL SPEECH RECOGNITION
  stop : () => {
    voice.recog.stop();
    voice.sbtn.onclick = voice.start;
    const sample = document.getElementById("search-speech");
    sample.style.background = `url('https://api.iconify.design/ph/microphone-fill.svg?color=black&height=24') center no-repeat`; 
    
    voice.sbtn.value = "";
  }
};
window.addEventListener("DOMContentLoaded", voice.init);



window.addEventListener('scroll',(event) => {
    console.log('Scrolling...');
	if (scrollTimer != -1)
        clearTimeout(scrollTimer);
		const t = clock.getElapsedTime();
		animate();
//		skeletonHelper.bones[18].rotation.x = Math.sin( t ) * 10.005;
//		skeletonHelper.bones[3].rotation.x = Math.sin( t ) * 10.005;
		/*	
		if(skeletonHelper.bones[18].rotation.x = -8.476002064288632){
			skeletonHelper.bones[18].rotation.x = Math.sin( t ) * 10.005;
		}

		if(skeletonHelper.bones[18].rotation.x = -2.8845221741125893){
			skeletonHelper.bones[18].rotation.x = Math.sin( t ) * -10.005;
		}


		if(skeletonHelper.bones[3].rotation.x = 2.8845221741125893){
			skeletonHelper.bones[3].rotation.x = Math.sin( t ) * 10.005;
		}

		if(skeletonHelper.bones[3].rotation.x = 8.11028946105655){
			skeletonHelper.bones[3].rotation.x = Math.sin( t ) * -10.005;
		}
	
		skeletonHelper.bones[74].rotation.y = Math.sin( t ) * -10.005;
		skeletonHelper.bones[102].rotation.y = Math.sin( t ) * -10.005;
*/
      scrollTimer = window.setTimeout(scrollFinished(), 5000);
    }
);

function scrollFinished() {
      console.log('Scroll Finished')
    };

	function scrollStop (callback, refresh = 66) {

		

// Make sure a valid callback was provided
if (!callback || typeof callback !== 'function') return;

// Setup scrolling variable
let isScrolling;



// Listen for scroll events
window.addEventListener('scroll', function (event) {

	// Clear our timeout throughout the scroll
	window.clearTimeout(isScrolling);

	// Set a timeout to run after scrolling ends
	isScrolling = setTimeout(callback, refresh);

}, false);

}

scrollStop(function () {
	
console.log('Scrolling has stopped.');
console.log(skeletonHelper.bones[18].rotation.x);
console.log(skeletonHelper.bones[3].rotation.x);
//skeletonHelper.bones[18].rotation.x = -3.0006409159284159933;
//skeletonHelper.bones[3].rotation.x = 3.0006409159284159933;
//skeletonHelper.bones[74].rotation.y = 0;
//skeletonHelper.bones[102].rotation.y = 0;
});

function pauseRecording(){
	console.log("pauseButton clicked rec.recording=",rec.recording );
	if (rec.recording){
		//pause
		rec.stop();
		pauseButton.innerHTML="Resume";
	}else{
		//resume
		rec.record()
		pauseButton.innerHTML="Pause";

	}
}

function server5(){
	console.log(camera);
}

if (navigator.mediaDevices.getUserMedia) {
	console.log('getUserMedia supported.');

	const constraints = { audio: true };
  let chunks = [];
  let onSuccess = function(stream) {
    const mediaRecorder = new MediaRecorder(stream);

	recordButton.addEventListener("click", recorde);
	stopButton.addEventListener("click", stop1);

     function recorde() {
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      console.log("recorder started");
     // record.style.background = "red";

      //stop.disabled = false;
     // record.disabled = true;
    }

    function stop1() {
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      console.log("recorder stopped");
     // record.style.background = "";
    //  record.style.color = "";
      // mediaRecorder.requestData();

      stop.disabled = true;
      //record.disabled = false;
    }

    mediaRecorder.onstop = function(e) {
      console.log("data available after MediaRecorder.stop() called.");

      const clipName = prompt('Enter a name for your sound clip?','My unnamed clip');

      const clipContainer = document.createElement('article');
      const clipLabel = document.createElement('p');
      const audio = document.createElement('audio');
      const deleteButton = document.createElement('button');

      clipContainer.classList.add('clip');
      audio.setAttribute('controls', '');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete';

      if(clipName === null) {
        clipLabel.textContent = 'My unnamed clip';
      } else {
        clipLabel.textContent = clipName;
      }

      clipContainer.appendChild(audio);
      clipContainer.appendChild(clipLabel);
      clipContainer.appendChild(deleteButton);
      soundClips.appendChild(clipContainer);

      audio.controls = true;
      const blob = new Blob(chunks, { 'type' : 'audio/wav; codecs=opus' });
      chunks = [];
      const audioURL = window.URL.createObjectURL(blob);
	  var url = URL.createObjectURL(blob);
	  var au = document.createElement('audio');
	var li = document.createElement('li');
	var link = document.createElement('a');

	//name of .wav file to use during upload and download (without extendion)
	var filename = new Date().toISOString();

//	//add controls to the <audio> element
//	au.controls = true;
//	au.src = url;

	//save to disk link
	link.href = url;
	link.download = filename+".wav"; //download forces the browser to donwload the file using the  filename
	link.innerHTML = "Save to disk";
      audio.src = audioURL;
	  var fd=new FormData();
	  var xhr=new XMLHttpRequest();
	fd.append("file",blob, filename);	
	// WARNING: For POST requests, body is set to null by browsers.
var data = new FormData();
data.append("file", blob, filename);
 
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});
 // create a blob here for testing
 var blob1 = new Blob(["i am a blob"]);
 
    //var blob = yourAudioBlobCapturedFromWebAudioAPI;// for example   
    var reader = new FileReader();
    // this function is triggered once a call to readAsDataURL returns
    reader.onload = function(event){
        var fd = new FormData();
		
       fd.append("file", blob);
        $.ajax({
            type: 'POST',
            url: 'https://sea-turtle-app-w6yax.ondigitalocean.app/read4',
            data: fd,
            processData: false,
            contentType: false
        }).done(function(data) {
            // print the output from the upload.php script
            console.log(data);
        });
    };      
    // trigger the read from the reader...
    reader.readAsDataURL(blob1);
/*xhr.open("POST", "https://sea-turtle-app-w6yax.ondigitalocean.app/read4", true);
xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
	xhr.setRequestHeader("Access-Control-Allow-Methods","PUT, GET, POST, DELETE, OPTIONS");
	xhr.setRequestHeader("Access-Control-Allow-Headers","Special-Request-Header, Origin, X-Requested-With, Content-Type, Accept, Authorization");
	xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
	xhr.setRequestHeader('Access-Control-Max-Age', '240');
xhr.send(data);
	xhr.open("POST","{{ site.apilink3 }}",true);
	xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
	xhr.setRequestHeader("Access-Control-Allow-Methods","PUT, GET, POST, DELETE, OPTIONS");
	xhr.setRequestHeader("Access-Control-Allow-Headers","Special-Request-Header, Origin, X-Requested-With, Content-Type, Accept, Authorization");
	xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
	xhr.setRequestHeader('Access-Control-Max-Age', '240');
	xhr.send(data);*/


	var formdata = new FormData();
formdata.append("file", blob, "microphone-recording4.wav");

	var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};


      console.log("recorder stopped");
	  console.log(audioURL);

      deleteButton.onclick = function(e) {
        e.target.closest(".clip").remove();
      }

      clipLabel.onclick = function() {
        const existingName = clipLabel.textContent;
        const newClipName = prompt('Enter a new name for your sound clip?');
        if(newClipName === null) {
          clipLabel.textContent = existingName;
        } else {
          clipLabel.textContent = newClipName;
        }
      }
    }

    mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
    }
  }
  let onError = function(err) {
    console.log('The following error occured: ' + err);
  }

  navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);

}else {
   console.log('getUserMedia not supported on your browser!');
}


function startRecording() {
	console.log("recordButton clicked");
	document.getElementById("stopButton").style.display = 'block';
	document.getElementById('recordButton').style.display = 'none';
	/*
		Simple constraints object, for more advanced audio features see
		https://addpipe.com/blog/audio-constraints-getusermedia/
	*/
    
    var constraints = { audio: true, video:false }

 	/*
    	Disable the record button until we get a success or fail from getUserMedia() 
	*/

	recordButton.disabled = false;
	stopButton.disabled = false;
	pauseButton.disabled = false

	/*
    	We're using the standard promise based getUserMedia() 
    	https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
	*/

	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
		console.log("getUserMedia() success, stream created, initializing Recorder.js ...");

		/*
			create an audio context after getUserMedia is called
			sampleRate might change after getUserMedia is called, like it does on macOS when recording through AirPods
			the sampleRate defaults to the one set in your OS for your playback device

		*/
		audioContext = new AudioContext();

		//update the format 
		document.getElementById("formats").innerHTML="Format: 1 channel pcm @ "+audioContext.sampleRate/1000+"kHz"

		/*  assign to gumStream for later use  */
		gumStream = stream;
		
		/* use the stream */
		input = audioContext.createMediaStreamSource(stream);

		/* 
			Create the Recorder object and configure to record mono sound (1 channel)
			Recording 2 channels  will double the file size
		*/
		rec = new Recorder(input,{numChannels:1})

		//start the recording process
		rec.record()

		console.log("Recording started");

	}).catch(function(err) {
	  	//enable the record button if getUserMedia() fails
    	recordButton.disabled = false;
    	stopButton.disabled = false;
    	pauseButton.disabled = true
	});
}


function stopRecording() {
	console.log("stopButton clicked");
	//console.log(window.e.head);;
	console.log(window);
	document.getElementById("recordButton").style.display = 'block';
	document.getElementById('stopButton').style.display = 'none';
	//disable the stop button, enable the record too allow for new recordings
	stopButton.disabled = false;
	recordButton.disabled = false;
	pauseButton.disabled = true;

	//reset button just in case the recording is stopped while paused
	pauseButton.innerHTML="Pause";
	
	//tell the recorder to stop the recording
//	rec.stop();

	//stop microphone access
	//gumStream.getAudioTracks()[0].stop();

	//create the wav blob and pass it on to createDownloadLink
	//rec.exportWAV(createDownloadLink);
}

function createDownloadLink(blob) {
	
	var url = URL.createObjectURL(blob);
	var au = document.createElement('audio');
	var li = document.createElement('li');
	var link = document.createElement('a');

	//name of .wav file to use during upload and download (without extendion)
	var filename = new Date().toISOString();

	//add controls to the <audio> element
	au.controls = true;
	au.src = url;

	//save to disk link
	link.href = url;
	link.download = filename+".wav"; //download forces the browser to donwload the file using the  filename
	link.innerHTML = "Save to disk";

	//add the new audio element to li
	li.appendChild(au);
	
	//add the filename to the li
	li.appendChild(document.createTextNode(filename+".wav "))

	//add the save to disk link to li
	li.appendChild(link);
	
	//upload link
	var upload = document.createElement('a');
	upload.href="#";
	upload.innerHTML = "Upload";
	var xhr=new XMLHttpRequest();
	xhr.onload=function(e) {
		if(this.readyState === 4) {
			console.log("Server returned: ",e.target.responseText);
			const text99 = JSON.parse(e.target.responseText);
			var userMessage = document.querySelector("#userInput").value;
      let userHtml = '<div class="d-flex justify-content-end mb-4">'+'<div class="msg_cotainer_send">'+text99.transcript+'</div>'+image1+'</div>';
      document.querySelector('#body').innerHTML+= userHtml;
	  let xhr = new XMLHttpRequest();
      xhr.open(`GET`, `{{ site.apilink1 }}${text99.transcript}`);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send(`messageValue=${text99.transcript}`);
	  xhr.onload = function () {
		var obj = JSON.parse(this.responseText);
		console.log(JSON.stringify(obj.traits));
		var objlength = JSON.stringify(obj.traits);
		var obj1q = JSON.stringify(this.responseText);
		if (objlength.length < 3) {
		var objecttext = "I'm sorry, but I didn't understand the question. Please try again";
		console.log(objecttext+'dfgdfgdfgdfgdgdgdgdgf'); 
		}else { var objecttext = obj.traits.text[0].value};
		let botHtml = '<div class="d-flex justify-content-start mb-4">'+'<div class="img_cont_msg">'+image2a+'</div>'+'<div class="msg_cotainer">'+objecttext+'</div>'+'</div>'
		document.querySelector('#body').innerHTML+= botHtml;
		const listener = new THREE.AudioListener();
		camera.add( listener );
		const sound = new THREE.Audio( listener );
		const audioLoader = new THREE.AudioLoader();
		audioLoader.load( `{{ site.apilink2 }}${objecttext}`, function( buffer ) {
		sound.setBuffer( buffer );
		sound.setLoop( false );
		sound.setVolume( 1 );
		sound.play();
		const analyser1 = new THREE.AudioAnalyser( sound, 32 );
		}); 
		analyser = new THREE.AudioAnalyser( sound, 32 );
		const data5 = analyser.getAverageFrequency();
		console.log( analyser1.data);
		};
		
		}
	};
	var fd=new FormData();
	fd.append("file",blob, filename);
	var xhr=new XMLHttpRequest();
	xhr.open("POST","{{ site.apilink3 }}",true);
	xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
	xhr.setRequestHeader("Access-Control-Allow-Methods","PUT, GET, POST, DELETE, OPTIONS");
	xhr.setRequestHeader("Access-Control-Allow-Headers","Special-Request-Header, Origin, X-Requested-With, Content-Type, Accept, Authorization");
	xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
	xhr.setRequestHeader('Access-Control-Max-Age', '240');
	xhr.send(fd);
	/*
e.target.responseText
	*/
	

	upload.addEventListener("click", function(event){
		  var xhr=new XMLHttpRequest();
		  xhr.onload=function(e) {
		      if(this.readyState === 4) {
		          console.log("Server returned: ",e.target.responseText);
		      }
		  };
		  var fd=new FormData();
		  fd.append("file",blob, filename);
		  xhr.open("POST","{{ site.apilink3 }}",true);
		  xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
		  xhr.setRequestHeader("Access-Control-Allow-Methods","PUT, GET, POST, DELETE, OPTIONS");
		  xhr.setRequestHeader("Access-Control-Allow-Headers","Special-Request-Header, Origin, X-Requested-With, Content-Type, Accept, Authorization");
		  xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
		  xhr.setRequestHeader('Access-Control-Max-Age', '240');
		  xhr.send(fd);
	})
	li.appendChild(document.createTextNode (" "))//add a space in between
	li.appendChild(upload)//add the upload link to li

	//add the li element to the ol
	recordingsList.appendChild(li);
}

playtrack.onclick = function playtrack1() {
let image2 = `<img src="/media/d1.jpg" class="rounded-circle user_img_msg">`;
const image1 = `<div class="img_cont_msg">
    <img src="/media/dude3.jpeg" class="rounded-circle user_img_msg">
            </div>`;
let xhr = new XMLHttpRequest();
var userMessage = document.querySelector("#userInput").value;
let userHtml = '<div class="d-flex justify-content-end mb-4">'+'<div class="msg_cotainer_send">'+userMessage+'</div>'+image1+'</div>'
document.querySelector('#body').innerHTML+= userHtml;
xhr.open(`GET`, `https://apps.emersa.io:8082/dude123a/${userMessage}`);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.send(`messageValue=${userMessage}`);
xhr.onload = function () {
var obj = JSON.parse(this.responseText);
console.log(JSON.stringify(obj));
console.log(JSON.stringify(obj.textList));
//console.log(JSON.stringify(obj.traits));
var objlength = JSON.stringify(obj.textList);
var obj1q = JSON.stringify(obj.textList);
if (objlength.length < 3) {
var objecttext = "I'm sorry, but I didn't understand the question. Please try again";
console.log(objecttext+'dfgdfgdfgdfgdgdgdgdgf'); 
}else { var objecttext = obj.textList};
let botHtml = '<div class="d-flex justify-content-start mb-4">'+'<div class="img_cont_msg">'+image2a+'</div>'+'<div class="msg_cotainer">'+objecttext+'</div>'+'</div>'
document.querySelector('#body').innerHTML+= botHtml;
const listener = new THREE.AudioListener();
camera.add( listener );
const sound = new THREE.Audio( listener );
const audioLoader = new THREE.AudioLoader();
audioLoader.load( `{{ site.apilink2 }}${objecttext}`, function( buffer ) {
sound.setBuffer( buffer );
sound.setLoop( false );
sound.setVolume( 1 );
sound.play();
const analyser1 = new THREE.AudioAnalyser( sound, 32 );
}); 
//analyser = new THREE.AudioAnalyser( sound, 32 );
//const data5 = analyser.getAverageFrequency();
//console.log( analyser1.data);
};
};


}

class BasicCharacterControllerProxy {
  constructor(animations) {
    this._animations = animations;
  }

  get animations() {
    return this._animations;
  }
};


class BasicCharacterController {
  constructor(params) {
    this._Init(params);
  }

  _Init(params) {
    this._params = params;
    this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
    this._acceleration = new THREE.Vector3(1, 0.25, 50.0);
    this._velocity = new THREE.Vector3(0, 0, 0);

    this._animations = {};
    this._input = new BasicCharacterControllerInput();
    this._stateMachine = new CharacterFSM(
        new BasicCharacterControllerProxy(this._animations));

    this._LoadModels();

 

  }

  _LoadModels() {
    this._manager = new THREE.LoadingManager();
    
    var textureLoader = new THREE.TextureLoader(this._manager);
    var skirt = textureLoader.load('/assets/glb/textures/skirt.png');
    var head = textureLoader.load('/assets/glb/textures/Std_Skin_Head_Diffuse.jpg');
    var body = textureLoader.load('/assets/glb/textures/Std_Skin_Body_Diffuse.jpg');
    var arm = textureLoader.load('/assets/glb/textures/Std_Skin_Arm_Diffuse.jpg');
    var leg = textureLoader.load('/assets/glb/textures/Std_Skin_Leg_Diffuse.jpg');
    var nails = textureLoader.load('/assets/glb/textures/Std_Nails_Diffuse.jpg');
    var eyelash = textureLoader.load('/assets/glb/textures/Std_Eyelash_Diffuse.jpg');
    var hair = textureLoader.load('/assets/glb/textures/Hair_Diffuse.png');
    var tearR = textureLoader.load('/assets/glb/textures/Std_Tearline_R_Diffuse.jpg');
    var tearL = textureLoader.load('/assets/glb/textures/Std_Tearline_L_Diffuse.jpg');
    var tongue = textureLoader.load('/assets/glb/textures/Std_Tongue_Diffuse.png');
    var upper = textureLoader.load('/assets/glb/textures/Std_Upper_Teeth_Diffuse.png');
    var lower = textureLoader.load('/assets/glb/textures/Std_Lower_Teeth_Diffuse.png');
    var hair01 = textureLoader.load('/assets/glb/textures/Hair_Diffuse_0001.png');
    var corneaL = textureLoader.load('/assets/glb/textures/Std_Cornea_L_Diffuse.png');
    var eyeL = textureLoader.load('/assets/glb/textures/Std_Eye_L_Diffuse.png');
    var corneaR = textureLoader.load('/assets/glb/textures/Std_Cornea_R_Diffuse.png');
    var eyeR = textureLoader.load('/assets/glb/textures/Std_Eye_R_Diffuse.png');
    var eyeRO = textureLoader.load('/assets/glb/textures/Std_Eye_Occlusion_R_Diffuse.jpg');
    var eyeLO = textureLoader.load('/assets/glb/textures/Std_Eye_Occlusion_L_Diffuse.jpg');
    var hair02 = textureLoader.load('/assets/glb/textures/Hair_Transparency_Diffuse.png');
    var scalp = textureLoader.load('/assets/glb/textures/Scalp_Transparency_Diffuse.jpg');
    var hair02Material = new THREE.MeshPhongMaterial({map:hair02});
    var eyeLOMaterial = new THREE.MeshPhongMaterial({map:eyeLO});
    var eyeROMaterial = new THREE.MeshPhongMaterial({map:eyeRO});
    var eyeLMaterial = new THREE.MeshPhongMaterial({map:eyeL});
    var corneaLMaterial = new THREE.MeshPhongMaterial({map: corneaL});
    var eyeRMaterial = new THREE.MeshPhongMaterial({map:eyeR});
    var corneaRMaterial = new THREE.MeshPhongMaterial({map: corneaR});
    var lowerMaterial = new THREE.MeshPhongMaterial({map: lower});
    var upperMaterial = new THREE.MeshPhongMaterial({map: upper});
    var tongueMaterial = new THREE.MeshPhongMaterial({map: tongue});
    var skirtMaterial = new THREE.MeshPhongMaterial({map: skirt});
    var tearLMaterial = new THREE.MeshPhongMaterial({map: tearL});
    var tearRMaterial = new THREE.MeshPhongMaterial({map: tearR});
    var bodyMaterial = new THREE.MeshPhongMaterial({map: body});
    var headMaterial = new THREE.MeshPhongMaterial({map: head});
    var armMaterial = new THREE.MeshPhongMaterial({map: arm});
    var legMaterial = new THREE.MeshPhongMaterial({map: leg});
    var nailMaterial = new THREE.MeshPhongMaterial({map: nails});
    var eyelashMaterial = new THREE.MeshPhongMaterial({map: eyelash});
    var hairMaterial = new THREE.MeshPhongMaterial({map: hair});
    var hair01Material = new THREE.MeshPhongMaterial({map: hair01});
    var scalpMaterial = new THREE.MeshPhongMaterial({map: scalp});

    const loader = new FBXLoader(this._manager);
    loader.setPath('/assets/glb/');
    loader.load('dude45g.fbx', (fbx) => {
      fbx.scale.setScalar(0.1);
      fbx.traverse(c => {
        c.castShadow = true;

        if ( c.isMesh ) {
          if ( c.name == "CC_Base_Body"){
           c.material[0] = skirtMaterial;
           c.material[1] = scalpMaterial;
           c.material[2] = hair02Material;
           c.material[3] = eyeROMaterial;
           c.material[4] = eyeLOMaterial;
           c.material[5] = eyeRMaterial;
           c.material[6] = corneaRMaterial;
           c.material[7] = eyeLMaterial;
           c.material[8] = corneaLMaterial;
           c.material[9] = hairMaterial;
          c.material[0] = headMaterial;
          c.material[1] = bodyMaterial;
          c.material[2] = armMaterial;
          c.material[3] = legMaterial;
          c.material[4] = nailMaterial;
          c.material[5] = eyelashMaterial;
           c.material[16] = tearRMaterial;
           c.material[17] = tearLMaterial;
           c.material[18] = tongueMaterial;
           c.material[19] = upperMaterial;
          c.material[20] = lowerMaterial;
          c.material[21] = hair01Material;
          console.log('working'); 
          }
          if ( c.name == "Double_high"){
            c.material[0] = scalpMaterial;
            c.material[1] = hair02Material;
            
            
            };
            
            if ( c.name == "CC_Base_EyeOcclusion"){
            c.material[0] = eyeROMaterial;
            c.material[1] = eyeLOMaterial;
            
            };
            
            if ( c.name == "CC_Base_Teeth"){
            c.material[0] = upperMaterial;
            c.material[1] = lowerMaterial;
            
            };
            if ( c.name == "A7_0310001"){
            c.material[0] = hairMaterial;
            c.material[1] = hairMaterial;
            };
            if ( c.name == "A7_0310"){
            c.material[0] = hairMaterial;
            c.material[1] = hair01Material;
            };
            
            if ( c.name ==  "CC_Base_Eye"){
            c.material[0] = eyeRMaterial;
            c.material[1] = corneaRMaterial;
            c.material[2] = eyeLMaterial;
            c.material[3] = corneaLMaterial;
            };
            
            if ( c.name == "CC_Base_TearLine"){
            c.material[16] = tearRMaterial;
            c.material[17] = tearLMaterial;
            };
            if ( c.name == "CC_Base_Tongue"){
            c.material[0] = tongueMaterial;
            }
        }

      });

      this._target = fbx;
      this._params.scene.add(this._target);

      this._mixer = new THREE.AnimationMixer(this._target);

      
	  //
	  
	    
    this._manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
      console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
      console.log( `Started loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files. (${((itemsLoaded / itemsTotal) * 100).toFixed(2)}%)`);
    };
    
    this._manager.onLoad = function ( ) {
      console.log( 'Loading complete!');
      
    document.getElementById('loader1').remove()
      
    };
    
    this._manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
      console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
      console.log( `Started loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files. (${((itemsLoaded / itemsTotal) * 100).toFixed(2)}%)`);
    };
    
    this._manager.onError = function ( url ) {
      console.log( 'There was an error loading ' + url );
    };
	  
	  //
      this._manager.onLoad = () => {
        this._stateMachine.SetState('idle');
        document.getElementById('loader1').remove();
      };

      const _OnLoad = (animName, anim) => {
        const clip = anim.animations[0];
        const action = this._mixer.clipAction(clip);
  
        this._animations[animName] = {
          clip: clip,
          action: action,
        };
      };

      const loader = new FBXLoader(this._manager);
      loader.setPath('/assets/glb/actions/');
      loader.load('walk.fbx', (a) => { _OnLoad('walk', a); });
      loader.load('run.fbx', (a) => { _OnLoad('run', a); });
      loader.load('idle.fbx', (a) => { _OnLoad('idle', a); });
      loader.load('dance.fbx', (a) => { _OnLoad('dance', a); });
    });
    
  }


  
  Update(timeInSeconds) {
    if (!this._target) {
      return;
    }

    this._stateMachine.Update(timeInSeconds, this._input);

    const velocity = this._velocity;
    const frameDecceleration = new THREE.Vector3(
        velocity.x * this._decceleration.x,
        velocity.y * this._decceleration.y,
        velocity.z * this._decceleration.z
    );
    frameDecceleration.multiplyScalar(timeInSeconds);
    frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(
        Math.abs(frameDecceleration.z), Math.abs(velocity.z));

    velocity.add(frameDecceleration);

    const controlObject = this._target;
    const _Q = new THREE.Quaternion();
    const _A = new THREE.Vector3();
    const _R = controlObject.quaternion.clone();

    const acc = this._acceleration.clone();
    if (this._input._keys.shift) {
      acc.multiplyScalar(2.0);
    }

    try {
      if (this._stateMachine._currentState.Name == 'dance') {
        acc.multiplyScalar(0.0);
      }
    } catch (error) {
      // Handle the error gracefully
      console.log("An error occurred:");
     // console.error("An error occurred:", error.message);
    }


    if (this._input._keys.forward) {
      velocity.z += acc.z * timeInSeconds;
    }
    if (this._input._keys.backward) {
      velocity.z -= acc.z * timeInSeconds;
    }
    if (this._input._keys.left) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, 4.0 * Math.PI * timeInSeconds * this._acceleration.y);
      _R.multiply(_Q);
    }
    if (this._input._keys.right) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * timeInSeconds * this._acceleration.y);
      _R.multiply(_Q);
    }

    controlObject.quaternion.copy(_R);

    const oldPosition = new THREE.Vector3();
    oldPosition.copy(controlObject.position);

    const forward = new THREE.Vector3(0, 0, 1);
    forward.applyQuaternion(controlObject.quaternion);
    forward.normalize();

    const sideways = new THREE.Vector3(1, 0, 0);
    sideways.applyQuaternion(controlObject.quaternion);
    sideways.normalize();

    sideways.multiplyScalar(velocity.x * timeInSeconds);
    forward.multiplyScalar(velocity.z * timeInSeconds);

    controlObject.position.add(forward);
    controlObject.position.add(sideways);

    oldPosition.copy(controlObject.position);

    if (this._mixer) {
      this._mixer.update(timeInSeconds);
    }
  }
};

class BasicCharacterControllerInput {
  constructor() {
    this._Init();    
  }

  _Init() {
    this._keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      space: false,
      shift: false,
    };
    document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
    document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
  }

  _onKeyDown(event) {
    switch (event.keyCode) {
      case 87: // w
        this._keys.forward = true;
        break;
      case 65: // a
        this._keys.left = true;
        break;
      case 83: // s
        this._keys.backward = true;
        break;
      case 68: // d
        this._keys.right = true;
        break;
      case 32: // SPACE
        this._keys.space = true;
        break;
      case 16: // SHIFT
        this._keys.shift = true;
        break;
    }
  }

  _onKeyUp(event) {
    switch(event.keyCode) {
      case 87: // w
        this._keys.forward = false;
        break;
      case 65: // a
        this._keys.left = false;
        break;
      case 83: // s
        this._keys.backward = false;
        break;
      case 68: // d
        this._keys.right = false;
        break;
      case 32: // SPACE
        this._keys.space = false;
        break;
      case 16: // SHIFT
        this._keys.shift = false;
        break;
    }
  }
};


class FiniteStateMachine {
  constructor() {
    this._states = {};
    this._currentState = null;
  }

  _AddState(name, type) {
    this._states[name] = type;
  }

  SetState(name) {
    const prevState = this._currentState;
    
    if (prevState) {
      if (prevState.Name == name) {
        return;
      }
      prevState.Exit();
    }

    const state = new this._states[name](this);

    this._currentState = state;
    state.Enter(prevState);
  }

  Update(timeElapsed, input) {
    if (this._currentState) {
      this._currentState.Update(timeElapsed, input);
    }
  }
};


class CharacterFSM extends FiniteStateMachine {
  constructor(proxy) {
    super();
    this._proxy = proxy;
    this._Init();
  }

  _Init() {
    this._AddState('idle', IdleState);
    this._AddState('walk', WalkState);
    this._AddState('run', RunState);
    this._AddState('dance', DanceState);
  }
};


class State {
  constructor(parent) {
    this._parent = parent;
  }

  Enter() {}
  Exit() {}
  Update() {}
};


class DanceState extends State {
  constructor(parent) {
    super(parent);

    this._FinishedCallback = () => {
      this._Finished();
    }
  }

  get Name() {
    return 'dance';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['dance'].action;
    const mixer = curAction.getMixer();
    mixer.addEventListener('finished', this._FinishedCallback);

    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.reset();  
      curAction.setLoop(THREE.LoopOnce, 1);
      curAction.clampWhenFinished = true;
      curAction.crossFadeFrom(prevAction, 0.2, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  _Finished() {
    this._Cleanup();
    this._parent.SetState('idle');
  }

  _Cleanup() {
    const action = this._parent._proxy._animations['dance'].action;
    
    action.getMixer().removeEventListener('finished', this._CleanupCallback);
  }

  Exit() {
    this._Cleanup();
  }

  Update(_) {
  }
};


class WalkState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'walk';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['walk'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.enabled = true;

      if (prevState.Name == 'run') {
        const ratio = curAction.getClip().duration / prevAction.getClip().duration;
        curAction.time = prevAction.time * ratio;
      } else {
        curAction.time = 0.0;
        curAction.setEffectiveTimeScale(1.0);
        curAction.setEffectiveWeight(1.0);
      }

      curAction.crossFadeFrom(prevAction, 0.5, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  Exit() {
  }

  Update(timeElapsed, input) {
    if (input._keys.forward || input._keys.backward) {
      if (input._keys.shift) {
        this._parent.SetState('run');
      }
      return;
    }

    this._parent.SetState('idle');
  }
};


class RunState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'run';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['run'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.enabled = true;

      if (prevState.Name == 'walk') {
        const ratio = curAction.getClip().duration / prevAction.getClip().duration;
        curAction.time = prevAction.time * ratio;
      } else {
        curAction.time = 0.0;
        curAction.setEffectiveTimeScale(1.0);
        curAction.setEffectiveWeight(1.0);
      }

      curAction.crossFadeFrom(prevAction, 0.5, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  Exit() {
  }

  Update(timeElapsed, input) {
    if (input._keys.forward || input._keys.backward) {
      if (!input._keys.shift) {
        this._parent.SetState('walk');
      }
      return;
    }

    this._parent.SetState('idle');
  }
};


class IdleState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'idle';
  }

  Enter(prevState) {
    const idleAction = this._parent._proxy._animations['idle'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;
      idleAction.time = 0.0;
      idleAction.enabled = true;
      idleAction.setEffectiveTimeScale(1.0);
      idleAction.setEffectiveWeight(1.0);
      idleAction.crossFadeFrom(prevAction, 0.5, true);
      idleAction.play();
    } else {
      idleAction.play();
    }
  }

  Exit() {
  }

  Update(_, input) {
    if (input._keys.forward || input._keys.backward) {
      this._parent.SetState('walk');
    } else if (input._keys.space) {
      this._parent.SetState('dance');
    }
  }
};


class CharacterControllerDemo {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    this._threejs = new THREE.WebGLRenderer({
      antialias: true,
    });
    this._threejs.outputEncoding = THREE.sRGBEncoding;
    this._threejs.shadowMap.enabled = true;
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    this._threejs.setPixelRatio(window.devicePixelRatio);
    this._threejs.setSize(window.innerWidth, window.innerHeight);

    let joystickWrapper1 = nipplejs.create({
      zone: document.getElementById('joystickWrapper1'),
      mode: 'static',
      position: { left: '50%', top: '90%' },
      color: 'red'
  });

    document.body.appendChild(this._threejs.domElement);

    window.addEventListener('resize', () => {
      this._OnWindowResize();
    }, false);

    const fov = 60;
    const aspect = 1920 / 1080;
    const near = 1.0;
    const far = 1000.0;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this._camera.position.set(25, 10, 25);

    this._scene = new THREE.Scene();

    let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(-100, 100, 100);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 4096;
    light.shadow.mapSize.height = 4096;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.left = 50;
    light.shadow.camera.right = -50;
    light.shadow.camera.top = 50;
    light.shadow.camera.bottom = -50;
    this._scene.add(light);

    light = new THREE.AmbientLight(0xFFFFFF, 0.25);
    this._scene.add(light);

    const controls = new OrbitControls(
      this._camera, this._threejs.domElement);
    controls.target.set(0, 10, 0);
    controls.update();
//


//
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        './resources/posx.jpg',
        './resources/negx.jpg',
        './resources/posy.jpg',
        './resources/negy.jpg',
        './resources/posz.jpg',
        './resources/negz.jpg',
    ]);
    texture.encoding = THREE.sRGBEncoding;
    this._scene.background = texture;


const grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
grid.material.opacity = 0.2;
grid.material.transparent = true;
this._scene.add( grid );
    
    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry( 2000, 2000, 10, 10),
        new THREE.MeshStandardMaterial({
            color: 0x808080,
          }));
    plane.castShadow = false;
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    this._scene.add(plane);

    this._mixers = [];
    this._previousRAF = null;

    this._LoadAnimatedModel();
    this._RAF();
    joystickWrapper1.on('move', function (fbxModel, event, data) {
      if (!fbxModel) return; // If the model hasn't loaded yet, do nothing
    console.log('im moving');
    const angle = data.angle.radian;

    // Create a quaternion for rotation around the Y-axis
    const quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle);
    fbxModel.quaternion.copy(quaternion);
      const forward = new THREE.Vector3(0, 0, 1);
      forward.applyQuaternion(fbxModel.quaternion);
      forward.normalize();
    
      // Adjust these values as needed
      const speed = 0.1;
      const direction = data.vector;
    
      // Move the model based on the joystick direction
      fbxModel.position.addScaledVector(forward, direction * speed);
      fbxModel.position.x += direction * speed;
    });
    
    joystickWrapper1.on('end', function () {
      // You can handle what happens when the joystick is released, if needed
    });
  }

  _LoadAnimatedModel() {
    const params = {
      camera: this._camera,
      scene: this._scene,
    }
    this._controls = new BasicCharacterController(params);
  }

  _LoadAnimatedModelAndPlay(path, modelFile, animFile, offset) {
    const loader = new FBXLoader();
    loader.setPath(path);
    loader.load(modelFile, (fbx) => {
      fbxModel = fbx; 
      fbxModel.scale.setScalar(0.1);
      fbxModel.traverse(c => {
        c.castShadow = true;
      });
      fbxModel.position.copy(offset);

      const anim = new FBXLoader();
      anim.setPath(path);
      anim.load(animFile, (anim) => {
        const m = new THREE.AnimationMixer(fbx);
        this._mixers.push(m);
        const idle = m.clipAction(anim.animations[0]);
        idle.play();
      });
      this._scene.add(fbxModel);
     
    });
    
    // Listen to joystick events
    joystick.on('move', function (evt, data) {
      console.log('asdasdasdasd ')
    })
  }

  _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);
  }

  _RAF() {
    requestAnimationFrame((t) => {
      if (this._previousRAF === null) {
        this._previousRAF = t;
      }

      this._RAF();

      this._threejs.render(this._scene, this._camera);
      this._Step(t - this._previousRAF);
      this._previousRAF = t;
    });
  }

  _Step(timeElapsed) {
    const timeElapsedS = timeElapsed * 0.001;
    if (this._mixers) {
      this._mixers.map(m => m.update(timeElapsedS));
    }

    if (this._controls) {
      this._controls.Update(timeElapsedS);
    }
  }
}


let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new CharacterControllerDemo();
});
