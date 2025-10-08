import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 15;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/*const geometry = new THREE.BoxGeometry(5,5,5);
const material = new THREE.MeshStandardMaterial({ color: 0xFF007F});
const cubeMesh = new THREE.Mesh(geometry, material);
scene.add(cubeMesh);*/

const TorusGeometry = new THREE.TorusGeometry(1.5, 0.5, 16, 100);
//const geometry = new THREE.ConeGeometry(5,10,32);
// const geometry = new THREE.CylinderGeometry(0.5,0.5,2,10);
//const geometry = new THREE.SphereGeometry(3,32,32);

// const material = new THREE.MeshStandardMaterial({
//   color: 0xFF69B4,
//   metalness: 0.4,
//   roughness: 0.3,
//   emissive: 0xAA336A,
// });


const material = new THREE.MeshPhongMaterial({
  color: 0xFF69B4,
  specular:0xffffff,
  shininess: 50,
});


//const material = new THREE.MeshStandardMaterial({ color: 0xF2D2BD , wireframe:true});
//const material = new THREE.MeshLambertMaterial({ color: 0x8844ff});

const torus = new THREE.Mesh(TorusGeometry, material);
scene.add(torus);

const ambientLight = new THREE.AmbientLight(0x9F2B68, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x9F2B68, 1);
directionalLight.position.set(2, 3, 5);
scene.add(directionalLight);

const lightHelper = new THREE.DirectionalLightHelper(directionalLight,0.5);
scene.add(lightHelper);


// plane
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x333444, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;
floor.position.y = -5;
scene.add(floor);



// icosahedron
const icosahedronGeometry = new THREE.IcosahedronGeometry(2);
const icosahedronMaterial = new THREE.MeshLambertMaterial({
  color: 0x00ffcc,
});
const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
icosahedron.position.set(-5, 0, 0);
scene.add(icosahedron);

// cone
const ConeGeometry = new THREE.ConeGeometry(1, 3, 20);
const ConeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffcc00,   
  metalness: 0.6,  
  roughness: 0.3,  
});
const cone = new THREE.Mesh(ConeGeometry, ConeMaterial);
cone.position.set(5, 0, 0);
scene.add(cone);


function animate() {
  requestAnimationFrame(animate);
  //cubeMesh.rotation.x += 0.01;
  //cubeMesh.rotation.y += 0.01;

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;

  icosahedron.rotation.y += 0.01;
  cone.rotation.x += 0.01;

  renderer.render(scene, camera);
}

animate();
