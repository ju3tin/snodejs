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
  
  draw1();

  if (audioElement.paused) {
    console.log("audio is stopped");
    setTimeout(initAudio, 1);
     clearInterval(initAudio);
}
}


function draw1() {

  
  analyser.getByteFrequencyData(frequencyData);
  
  // for every frequency
  for (let i = 0; i < bufferLength; i++) {
   
    let frequencyHeight = frequencyData[i] * 200 * 0.004;
    
    // if (Math.random() < 0.001) {
       console.log(frequencyHeight);
    // }
    
   }
  
  requestAnimationFrame(draw1);
}


