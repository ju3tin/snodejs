import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js";

import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/controls/OrbitControls.js";

import {FBXLoader} from 'three/addons/loaders/FBXLoader.js';
// import { nipplejs } from "./nipplejs.min.js";

// import nipplejs from "https://cdnjs.cloudflare.com/ajax/libs/nipplejs/0.9.1/nipplejs.min.js";

// console.log(nipplejs);

// vars
let fbxModel;
let fwdValue = 0;
let bkdValue = 0;
let rgtValue = 0;
let lftValue = 0;
let tempVector = new THREE.Vector3();
let upVector = new THREE.Vector3(0, 1, 0);
let joyManager;

const animations = {};

var width = window.innerWidth,
  height = window.innerHeight;

// Create a renderer and add it to the DOM.
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// Create the scene
var scene = new THREE.Scene();

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
scene.add(light);

light = new THREE.AmbientLight(0xFFFFFF, 0.25);
scene.add(light);

// Create a camera
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.z = 0.1;
camera.position.y = 0.1;

scene.add(camera);

// Create a light, set its position, and add it to the scene.
// var light = new THREE.PointLight(0xffffff);
// light.position.set(-100, 200, 100);
// scene.add(light);

// Add OrbitControls so that we can pan around with the mouse.
var controls = new OrbitControls(camera, renderer.domElement);
controls.maxDistance = 100;
controls.minDistance = 100;
//controls.maxPolarAngle = (Math.PI / 4) * 3;
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = 0;
controls.autoRotate = false;
controls.autoRotateSpeed = 0;
controls.rotateSpeed = 0.4;
controls.enableDamping = false;
controls.dampingFactor = 0.1;
controls.enableZoom = false;
controls.enablePan = false;
controls.minAzimuthAngle = -Math.PI / 2; // radians
controls.maxAzimuthAngle = Math.PI / 4; // radians

// Add axes
var axes = new THREE.AxesHelper(50);
scene.add(axes);

// Add grid
const size = 500;
const divisions = 50;

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

var geometry = new THREE.SphereGeometry(5, 32, 32);
var cubeMaterial = new THREE.MeshNormalMaterial();

var textureLoader = new THREE.TextureLoader();
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

const loader = new FBXLoader();
loader.load('/assets/glb/dude45g.fbx', (fbx) => {
    fbxModel = fbx;
    scene.add(fbxModel);
    fbxModel.scale.set(0.1, 0.1, 0.1);
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
const manager = new THREE.LoadingManager();
    
   const mixer = new THREE.AnimationMixer(fbxModel);

   const animLoader = new FBXLoader();
   animLoader.load('/assets/glb/actions/idle.fbx', (anim) => {
       const idleAnim = mixer.clipAction(anim.animations[0]);
       animations['idle'] = idleAnim;
   });
      
	  //
	  
	    
    manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
      console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
      console.log( `Started loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files. (${((itemsLoaded / itemsTotal) * 100).toFixed(2)}%)`);
    };
    
    manager.onLoad = function ( ) {
      console.log( 'Loading complete!');
      
    document.getElementById('loader1').remove()
      
    };
    
    manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
      console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
      console.log( `Started loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files. (${((itemsLoaded / itemsTotal) * 100).toFixed(2)}%)`);
    };
    
    manager.onError = function ( url ) {
      console.log( 'There was an error loading ' + url );
    };
	  
	  //
      manager.onLoad = () => {
        //stateMachine.SetState('idle');
        //mixer.clipAction(animations[0]);

     //   mixer = new THREE.AnimationMixer(fbxModel);

        // Load an animation named 'idle'
        const animLoader = new FBXLoader();
        animLoader.load('/path/to/your/idleAnimation.fbx', (anim) => {
            const idleAnim = mixer.clipAction(anim.animations[0]);
            animations['idle'] = idleAnim;
        });
        if (animations[0]) {
            animations[0].play();
        }
        document.getElementById('loader1').remove();
      };

      const _OnLoad = (animName, anim) => {
        const clip = anim.animations[0];
        const action = mixer.clipAction(clip);
  
        animations[animName] = {
          clip: clip,
          action: action,
        };
      };

      const loader5 = new FBXLoader(manager);
      loader5.setPath('/assets/glb/actions/');
      loader5.load('walk.fbx', (a) => { _OnLoad('walk', a); });
      loader5.load('run.fbx', (a) => { _OnLoad('run', a); });
      loader5.load('idle.fbx', (a) => { _OnLoad('idle', a); });
      loader5.load('dance.fbx', (a) => { _OnLoad('dance', a); });

    // Assuming fbxModel is your loaded FBX model
const rotationX = THREE.MathUtils.radToDeg(fbxModel.rotation.x);
const rotationY = THREE.MathUtils.radToDeg(fbxModel.rotation.y);
const rotationZ = THREE.MathUtils.radToDeg(fbxModel.rotation.z);
console.log(`FBX Model Rotation - X: ${rotationX.toFixed(2)}°, Y: ${rotationY.toFixed(2)}°, Z: ${rotationZ.toFixed(2)}°`);
    console.log("Model loaded and added to the scene");
}, undefined, function(error) {
    console.error("An error happened during the loading of the model:", error);
});

const loader1 = new THREE.CubeTextureLoader();
const texture = loader1.load([
    './resources/posx.jpg',
    './resources/negx.jpg',
    './resources/posy.jpg',
    './resources/negy.jpg',
    './resources/posz.jpg',
    './resources/negz.jpg',
]);
texture.encoding = THREE.sRGBEncoding;
scene.background = texture;

var mesh = new THREE.Mesh(geometry, cubeMaterial);
mesh.visible = false;
// Assuming fbxModel is your loaded FBX model

scene.add(mesh);
//scene.add(fbxModel);

//var ground = new Object3D()
let size_floor = 600;
var geometry_floor = new THREE.BoxGeometry(size_floor, 0, size_floor);
var material_floor = new THREE.MeshNormalMaterial();

var floor = new THREE.Mesh(geometry_floor, material_floor);
floor.position.y = -1.5;
floor.visible = true;
//fbxModel.scale.setScalar(1);
// ground.add(floor);
scene.add(floor);
//floor.rotation.x = -Math.PI / 2

resize();
animate();
window.addEventListener("resize", resize);

// added joystick + movement
addJoystick();

function resize() {
  let w = window.innerWidth;
  let h = window.innerHeight;

  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

function updateModelDirection() {
    fbxModel.rotation.copy(camera.rotation);
    // Apply any necessary adjustments to the rotation here
}

// Renders the scene
function animate() {
  updatePlayer();
  renderer.render(scene, camera);
  controls.update();

  requestAnimationFrame(animate);
}

function updatePlayer() {
  // move the player
  //let fbxx = fbxModel.rotation.x
  if (!fbxModel) {
    console.log("FBX model is not loaded yet.");
    return; // Exit the function if fbxModel is undefined
}

// Assuming fbxModel is defined, proceed with accessing its properties
const rotationX = THREE.MathUtils.radToDeg(fbxModel.rotation.x);
const rotationY = THREE.MathUtils.radToDeg(fbxModel.rotation.y);
const rotationZ = THREE.MathUtils.radToDeg(fbxModel.rotation.z);
const camrotationX = THREE.MathUtils.radToDeg(camera.rotation.x);
const camrotationY = THREE.MathUtils.radToDeg(camera.rotation.y);
const camrotationZ = THREE.MathUtils.radToDeg(camera.rotation.z);
  const angle = controls.getAzimuthalAngle();
  console.log(`the current azimuth angle is ${angle} and fbx anglee = (${rotationX},${rotationY},${rotationZ}) and cam angle= (${camrotationX},${camrotationY},${camrotationZ})`);

  if (fwdValue > 0) {
    tempVector.set(0, 0, -fwdValue).applyAxisAngle(upVector, angle);
    fbxModel.position.addScaledVector(tempVector, 2);
    mesh.position.addScaledVector(tempVector, 2);
    console.log('forward');
const rotation180Radians = Math.PI; 
const cameraZRotation = camera.rotation.y;
fbxModel.rotation.y = rotation180Radians + cameraZRotation;
  }

  if (bkdValue > 0) {
    tempVector.set(0, 0, bkdValue).applyAxisAngle(upVector, angle);
    fbxModel.position.addScaledVector(tempVector, 1);
    mesh.position.addScaledVector(tempVector, 1);
    console.log('back');
    const rotation180Radians = Math.PI; 
const cameraZRotation = camera.rotation.y;
fbxModel.rotation.y = rotation180Radians + cameraZRotation;
    
  }

  if (lftValue > 0) {
    tempVector.set(-lftValue, 0, 0).applyAxisAngle(upVector, angle);
    fbxModel.position.addScaledVector(tempVector, 1);
    mesh.position.addScaledVector(tempVector, 1);
    console.log('left');
    const rotation180Radians = Math.PI; 
const cameraZRotation = camera.rotation.y;
fbxModel.rotation.y = rotation180Radians + cameraZRotation;
  }

  if (rgtValue > 0) {
    tempVector.set(rgtValue, 0, 0).applyAxisAngle(upVector, angle);
    fbxModel.position.addScaledVector(tempVector, 1);
    mesh.position.addScaledVector(tempVector, 1);
    console.log('right');const rotation180Radians = Math.PI; 
    const cameraZRotation = camera.rotation.y;
    fbxModel.rotation.y = rotation180Radians + cameraZRotation;
  }

  mesh.updateMatrixWorld();

  // controls.target.set(mesh.position.x, mesh.position.y, mesh.position.z);
  // reposition camera
  camera.position.sub(controls.target);
  controls.target.copy(mesh.position);
  // console.log(mesh.position);
  camera.position.add(mesh.position.sub(new THREE.Vector3(0, 0, 0)));
}

function addJoystick() {
  const options = {
    zone: document.getElementById("joystickWrapper1"),
    size: 120,
    multitouch: true,
    maxNumberOfNipples: 2,
    mode: "static",
    restJoystick: true,
    shape: "circle",
    // position: { top: 20, left: 20 },
    //position: { top: "60px", left: "50%" },
    dynamicPage: true,
  };

  joyManager = nipplejs.create(options);

  joyManager["0"].on("move", function (evt, data) {
    const forward = data.vector.y;
    const turn = data.vector.x;

    if (forward > 0) {
      fwdValue = Math.abs(forward);
      bkdValue = 0;
    } else if (forward < 0) {
      fwdValue = 0;
      bkdValue = Math.abs(forward);
    }

    if (turn > 0) {
      lftValue = 0;
      rgtValue = Math.abs(turn);
    } else if (turn < 0) {
      lftValue = Math.abs(turn);
      rgtValue = 0;
    }
  });

  joyManager["0"].on("end", function (evt) {
    bkdValue = 0;
    fwdValue = 0;
    lftValue = 0;
    rgtValue = 0;
  });
}