import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 18;

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
// ----- top-left corner (cubes) -----
const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),
  new THREE.MeshStandardMaterial({ color: 0xF88379 }));
cube1.position.set(-7, 3, 0);
group.add(cube1);

const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),
  new THREE.MeshStandardMaterial({ color: 0xFF69B4 }));
cube2.position.set(-4, 3, 0);
group.add(cube2);

const cube3 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),
  new THREE.MeshStandardMaterial({ color: 0xA95C68 }));
cube3.position.set(-1, 3, 0);
group.add(cube3);

// ----- top-right corner (spheres) -----
const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(0.7,32,16),
  new THREE.MeshStandardMaterial({ color: 0x87CEEB }));
sphere1.position.set(3, 3, 0);
group.add(sphere1);

const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.7,32,16),
  new THREE.MeshStandardMaterial({ color: 0x00CED1 }));
sphere2.position.set(5, 3, 0);
group.add(sphere2);

const sphere3 = new THREE.Mesh(new THREE.SphereGeometry(0.7,32,16),
  new THREE.MeshStandardMaterial({ color: 0x4682B4 }));
sphere3.position.set(8, 3, 0);
group.add(sphere3);

// ----- bottom-left corner (cones) -----
const cone1 = new THREE.Mesh(new THREE.ConeGeometry(0.7,1.2,24),
  new THREE.MeshStandardMaterial({ color: 0xFFD700 }));
cone1.position.set(-8, -3, 0);
group.add(cone1);

const cone2 = new THREE.Mesh(new THREE.ConeGeometry(0.7,1.2,24),
  new THREE.MeshStandardMaterial({ color: 0xFFA500 }));
cone2.position.set(-3, -3, 0);
group.add(cone2);

const cone3 = new THREE.Mesh(new THREE.ConeGeometry(0.7,1.2,24),
  new THREE.MeshStandardMaterial({ color: 0xFF8C00 }));
cone3.position.set(0, -3, 0);
group.add(cone3);

// ----- bottom-right corner (cylinders) -----
const cyl1 = new THREE.Mesh(new THREE.CylinderGeometry(0.6,0.6,1.2,24),
  new THREE.MeshStandardMaterial({ color: 0x32CD32 }));
cyl1.position.set(2, -3, 0);
group.add(cyl1);

const cyl2 = new THREE.Mesh(new THREE.CylinderGeometry(0.6,0.6,1.2,24),
  new THREE.MeshStandardMaterial({ color: 0x228B22 }));
cyl2.position.set(5, -3, 0);
group.add(cyl2);

const cyl3 = new THREE.Mesh(new THREE.CylinderGeometry(0.6,0.6,1.2,24),
  new THREE.MeshStandardMaterial({ color: 0x006400 }));
cyl3.position.set(10, -3, 0);
group.add(cyl3);


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
