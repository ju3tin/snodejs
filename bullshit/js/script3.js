// 1. init canvas
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 40;
canvas.height = window.innerHeight / 3;

// -- MICROPHONE
// document.querySelector("body").onclick = () => {
//   navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
//     let source = audioContext.createMediaStreamSource(stream);
//     run(source);
//   });
// };

// 2. grab audio element
let audioElement = document.querySelector('audio');
audioElement.addEventListener('play', initAudio);

// 3. init audio system
let analyser, bufferLength, frequencyData;

function initAudio() {
  let audioContext = new window.AudioContext();
  let source = audioContext.createMediaElementSource(audioElement);
  analyser = audioContext.createAnalyser();
  
  source.connect(analyser);
  source.connect(audioContext.destination);
  
  // analyser.fftSize = 64;
  
  bufferLength = analyser.frequencyBinCount;
  frequencyData = new Uint8Array(bufferLength);
  
  // bufferLength *= 0.7;
  
  draw();
}


// 4. draw spectrum - call 60 fps
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  analyser.getByteFrequencyData(frequencyData);
  let frequencyWidth = Math.ceil(canvas.width / bufferLength);
  
  // for every frequency
  for (let i = 0; i < bufferLength; i++) {
   
    let frequencyHeight = frequencyData[i] * canvas.height * 0.004;
    
    // if (Math.random() < 0.001) {
       console.log(frequencyHeight);
    // }
    
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#e52e71');
    gradient.addColorStop(1, '#ff8a00');    
    ctx.fillStyle = gradient;
    
    ctx.fillRect(frequencyWidth * i,
                 canvas.height - frequencyHeight,
                 frequencyWidth,
                 frequencyHeight); 
  }
  
  requestAnimationFrame(draw);
}
