import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 11;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/*const geometry = new THREE.BoxGeometry(5,5,5);
const material = new THREE.MeshStandardMaterial({ color: 0xFF007F});
const cubeMesh = new THREE.Mesh(geometry, material);
scene.add(cubeMesh);
*/
//change object position
/*cubeMesh.position.x=0.7;
cubeMesh.position.y=-0.6;
cubeMesh.position.z=-10;*/
//ose
//cubeMesh.position.set(0.7,-0.6,1);

//console.log("Distance to camera:", cubeMesh.position.distanceTo(camera.position));


//axes helper
const axes=new THREE.AxesHelper(9)
scene.add(axes)

//scale objects
//cubeMesh.scale.x=2
//cubeMesh.scale.y=0.25
//cubeMesh.scale.z=0.5

//rotating objects
//cubeMesh.rotation.x=Math.PI*0.25
//cubeMesh.rotation.y=Math.PI*0.25


//applying all transformations at once

/*cubeMesh.position.x=0.7
cubeMesh.position.y=-0.6
cubeMesh.position.z=1
cubeMesh.scale.x=2
cubeMesh.scale.y=0.25
cubeMesh.scale.z=0.5
cubeMesh.rotation.x=Math.PI*0.25
cubeMesh.rotation.y=Math.PI*0.25*/






const light = new THREE.DirectionalLight(0x9F2B68	, 1);
light.position.set(2, 2, 5);
scene.add(light);


// scene graph
const group = new THREE.Group();
group.scale.y = 2;
group.rotation.y = 0.2;
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0xF88379 })
);
cube1.position.x = -1.5;
group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0xFF69B4 })
);
cube2.position.x = 0; 
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0xA95C68 })
);
cube3.position.x = 1.5;
group.add(cube3);


function animate() {
  requestAnimationFrame(animate);
  //cubeMesh.rotation.x += 0.01;
  //cubeMesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();
