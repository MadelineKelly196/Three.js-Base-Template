import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import loadGLBModels from './loadModels.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

// Controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;

// Lights
const pointLight = new THREE.PointLight(0xffffff, 450, 100);
pointLight.position.set(15,15,15);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add( pointLight, ambientLight );

// Helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

// Basic Object example
const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const cubeMaterial = new THREE.MeshStandardMaterial( { color: 0xFF6374 } );
const defaultCube = new THREE.Mesh( cubeGeometry, cubeMaterial );
defaultCube.position.x = -3;
scene.add( defaultCube );

// Load a glb resource
const models = [];
const glbPaths = ["example.glb"]; // Add more paths as needed
await loadGLBModels(models, glbPaths);
models.forEach(model => scene.add(model));

// Rotate models
function animate() {

  defaultCube.rotation.x += 0.01;
  defaultCube.rotation.y += 0.01;

  controls.update();

  renderer.render( scene, camera );
}