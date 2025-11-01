import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//SKEENA
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcfe8ff);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(70, 70, 70);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

//DRITAT
const sunlight = new THREE.DirectionalLight(0xffffff, 1.5);
sunlight.position.set(50, 150, -100);
sunlight.castShadow = true;

// hijet
sunlight.shadow.mapSize.width = 4096;
sunlight.shadow.mapSize.height = 4096;
sunlight.shadow.camera.near = 10;
sunlight.shadow.camera.far = 500;
sunlight.shadow.camera.left = -150;
sunlight.shadow.camera.right = 150;
sunlight.shadow.camera.top = 150;
sunlight.shadow.camera.bottom = -150;
sunlight.shadow.bias = -0.0001;
scene.add(sunlight);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;



const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

const hemiLight = new THREE.HemisphereLight(0xcceeff, 0x666633, 0.5);
scene.add(hemiLight);

//MATERIALET
const grassMat = new THREE.MeshLambertMaterial({ color: 0x6aa84f });
const roadMat = new THREE.MeshPhongMaterial({ color: 0x7a7d81, shininess: 10 });

const orangeMat = new THREE.MeshPhysicalMaterial({ color: 0xff8c42, roughness: 0.4, metalness: 0.1, clearcoat: 0.3 });
const blueMat = new THREE.MeshPhongMaterial({ color: 0x4d9fff, shininess: 80 });
const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8f8f8, roughness: 0.6, metalness: 0.2 });
const roofMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.8 });

const postMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
const glowMat = new THREE.MeshStandardMaterial({ color: 0xfff7cc, emissive: 0xfff2b3, emissiveIntensity: 0.8 });
const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5a3a1b });
const leafMat = new THREE.MeshLambertMaterial({ color: 0x2e8b57 });
const chairMat = new THREE.MeshStandardMaterial({ color: 0x8b4513 });


//PLANE-TOKA
const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), grassMat);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);
function addCustomWindows({
  x, y, z,
  width, height, depth,
  rotationY = 0,
  rows = 3, cols = 5,
  winWidth = 10, winHeight = 8, spacingX = 18, spacingY = 14,
  color = 0x99ccff, glow = 0.2
}) {
  const mat = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: glow,
    transparent: true,
    opacity: 0.8,
  });

  const group = new THREE.Group();
  const geo = new THREE.BoxGeometry(winWidth, winHeight, 0.1);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const w = new THREE.Mesh(geo, mat);
      w.position.set(
        -width / 2 + 10 + c * spacingX,
        -height / 2 + 8 + r * spacingY,
        depth / 2 + 0.15
      );
      group.add(w);
    }
  }

  group.position.set(x, y, z);
  group.rotation.y = rotationY;
  scene.add(group);
}


//NDERTESAT
const buildingsGroup = new THREE.Group();

//orange building-career center
const orangeBuilding = new THREE.Mesh(new THREE.BoxGeometry(80, 40, 20), orangeMat);
orangeBuilding.position.set(-60, 20, 55);
orangeBuilding.rotation.y = -THREE.MathUtils.degToRad(30);
addCustomWindows({
  x: -48, y: 18, z: 38.6,
  width: 80, height: 40, depth: 20,
  rotationY: -THREE.MathUtils.degToRad(30),
  rows: 3, cols: 4,
  winWidth: 12, winHeight: 9,
  color: 0xcfe2ff, glow: 0.1
});
buildingsGroup.add(orangeBuilding);

const orangeRoof = new THREE.Mesh(new THREE.BoxGeometry(81, 1, 21), roofMat);
orangeRoof.position.set(-60, 40, 55);
orangeRoof.rotation.y = -THREE.MathUtils.degToRad(30);
buildingsGroup.add(orangeRoof);

//blue building-816
const blueBuilding = new THREE.Mesh(new THREE.BoxGeometry(60, 28, 30), blueMat);
blueBuilding.position.set(-35, 14, -65);
blueBuilding.rotation.y = -THREE.MathUtils.degToRad(90);
addCustomWindows({
  x:-4.8, y: 12, z: -65,
  width: 60, height: 28, depth: 30,
  rotationY: -THREE.MathUtils.degToRad(90),
  rows: 2, cols: 3,
  winWidth: 12, winHeight: 10,
  color: 0x99ccff, glow: 0.4
});
buildingsGroup.add(blueBuilding);

const blueRoof = new THREE.Mesh(new THREE.BoxGeometry(61, 1, 31), roofMat);
blueRoof.position.set(-35, 28, -65);
blueRoof.rotation.y = -THREE.MathUtils.degToRad(90);
buildingsGroup.add(blueRoof);

//white buiklding-library
const whiteBuilding = new THREE.Mesh(new THREE.BoxGeometry(90, 35, 30), whiteMat);
whiteBuilding.position.set(55, 17, 35);
whiteBuilding.rotation.y = THREE.MathUtils.degToRad(90);
addCustomWindows({
  x: 64.8, y: 20, z: 55,
  width: 40, height: 35, depth: -50,
  rotationY: THREE.MathUtils.degToRad(90),
  rows: 2, cols: 4,
  winWidth: 14, winHeight: 10,
  color: 0xddeeff, glow: 0.3
});

buildingsGroup.add(whiteBuilding);

const whiteRoof = new THREE.Mesh(new THREE.BoxGeometry(91, 1, 31), roofMat);
whiteRoof.position.set(55, 35, 35);
whiteRoof.rotation.y = THREE.MathUtils.degToRad(90);

buildingsGroup.add(whiteRoof);

scene.add(buildingsGroup);


//TROTUARET
const roadsGroup = new THREE.Group();

// Main Road
const mainRoad = new THREE.Mesh(new THREE.BoxGeometry(30, 0.3, 200), roadMat);
mainRoad.position.y = 0.15;
roadsGroup.add(mainRoad);

// Diagonal Road
const diagonalRoad = new THREE.Mesh(new THREE.BoxGeometry(17, 0.3, 110), roadMat);
diagonalRoad.rotation.y = -THREE.MathUtils.degToRad(120);
diagonalRoad.position.set(-55, 0.15, 20);
roadsGroup.add(diagonalRoad);

// Buildings Roads

const whitebuildingRoad = new THREE.Mesh(new THREE.BoxGeometry(13, 0.3, 50), roadMat);
whitebuildingRoad.rotation.y = -THREE.MathUtils.degToRad(90);
whitebuildingRoad.position.set(15, 0.15, 54);
roadsGroup.add(whitebuildingRoad);

const bluebuildingRoad = new THREE.Mesh(new THREE.BoxGeometry(13, 0.3, 10), roadMat);
bluebuildingRoad.rotation.y = -THREE.MathUtils.degToRad(90);
bluebuildingRoad.position.set(-15, 0.15, -79);
roadsGroup.add(bluebuildingRoad);

const orangebuildingRoad = new THREE.Mesh(new THREE.BoxGeometry(13, 0.3, 15), roadMat);
orangebuildingRoad.rotation.y = -THREE.MathUtils.degToRad(30);
orangebuildingRoad.position.set(-78, 0.15, 25);
roadsGroup.add(orangebuildingRoad);

scene.add(roadsGroup);



//LLAMPAT
const lampPositions = [
  [18, 10, 30],
  [18, 10, 65],
  [18, 10, 95],
  [-18, 10, -25],
  [18, 10, -90],
  [18, 10, -50],
  [18, 10, -10],
  [18, 10, -10], 
  [-85, 10, 20],
  [-18, 10, 95]

];

const streetLights = [];

lampPositions.forEach(([x, y, z]) => {
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 20, 12), postMat);
  post.position.set(x, y, z);

  const bulb = new THREE.Mesh(new THREE.SphereGeometry(2, 16, 16), glowMat);
  bulb.position.set(x, y + 7, z);

  const light = new THREE.PointLight(0xfff3cc, 1.2, 30);
  light.position.set(x, y + 7, z);

  streetLights.push(light);
  scene.add(post, bulb, light);
});


// DRUNAT,BREDHAT
function addBigTree(x, z) {
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 20, 16), trunkMat);
  trunk.position.set(x, 10, z);
  trunk.castShadow = true;

  const leaves = new THREE.Mesh(new THREE.SphereGeometry(8, 20, 20), leafMat);
  leaves.position.set(x, 22, z);
  leaves.castShadow = true;

  scene.add(trunk, leaves);
}

[[25,8], [25,75]].forEach(([x, z]) => addBigTree(x, z));


const addFirTree = (x, z, scale = 1) => {
  //Trunk
  const trunkHeight = 7 * scale;
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4 * scale, 0.6 * scale, trunkHeight, 8),
    trunkMat
  );
  trunk.position.set(x, trunkHeight / 2, z);
  scene.add(trunk);

  //Green cones
  const coneMat = new THREE.MeshStandardMaterial({ color: 0x1a472a });
  const layerCount = 4;
  const startY = trunkHeight - 0.5 * scale;

  for (let i = 0; i < layerCount; i++) {
    const height = 7 * scale;
    const radius = 3.5 * scale - i * 0.6 * scale;
    const cone = new THREE.Mesh(new THREE.ConeGeometry(radius, height, 12), coneMat);
    cone.position.set(x, startY + i * 2.5 * scale, z);
    cone.castShadow = true;
    scene.add(cone);
  }
};

[[-20,-10], [-20,5], [-20,20], [-35,15], [-55,4],[-75,-7]].forEach(([x, z]) => addFirTree(x, z));
[[-35,49], [-45,45],[-25,55]].forEach(([x, z]) => addFirTree(x, z));

const addBareTree = (x, z, scale = 1) => {
  //trunk
  const trunkHeight = 8 * scale;
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4 * scale, 0.6 * scale, trunkHeight, 8),
    trunkMat
  );
  trunk.position.set(x, trunkHeight / 2, z);
  trunk.castShadow = true;
  scene.add(trunk);

  //deget
  const branchMat = new THREE.MeshStandardMaterial({ color: 0x4b2e05 });
  const branchCount = 8;

  for (let i = 0; i < branchCount; i++) {
    const branch = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05 * scale, 0.2 * scale, 3 * scale, 6),
      branchMat
    );

    const angle = (i / branchCount) * Math.PI * 2;
    branch.position.set(
      x + Math.cos(angle) * 0.5 * scale,
      trunkHeight * (0.4 + Math.random() * 0.5),
      z + Math.sin(angle) * 0.5 * scale
    );

    branch.rotation.z = Math.PI / 2.5;
    branch.rotation.y = angle;
    branch.castShadow = true;
    scene.add(branch);
  }
};
addBareTree(70, -65, 2.3);
addBareTree(45, -80, 2.3);
addBareTree(80, -25, 2.3);



//KARIKET
function addBench(x, z, rot = 0) {
  const base = new THREE.Mesh(new THREE.BoxGeometry(15, 1, 5), chairMat);
  const back = new THREE.Mesh(new THREE.BoxGeometry(15, 4, 0.3), chairMat);
  base.position.set(x, 0.3, z);
  back.position.set(x, 2, z );
  base.rotation.y = back.rotation.y = rot;
  scene.add(base, back);
}

addBench(25, 40, 3.14);
addBench(-60, 35, 75);


//GJETHET E VJESHTES

const addFallenLeaves = (count = 200) => {
  const leafColors = [0xb87333, 0xd4a017, 0xc19a6b, 0xdeb887, 0xcd853f]; // brown/yellow shades

  for (let i = 0; i < count; i++) {
    const color = leafColors[Math.floor(Math.random() * leafColors.length)];
    const leafMat = new THREE.MeshLambertMaterial({ color, side: THREE.DoubleSide });
    const leafGeo = new THREE.CircleGeometry(Math.random() * 0.4 + 0.1, 6);

    const leaf = new THREE.Mesh(leafGeo, leafMat);

    // Random position within grass area pervec trouareve 
    const x = (Math.random() - 0.5) * 180;
    const z = (Math.random() - 0.5) * 180;

    // Skip trotuaret
    if (Math.abs(x) < 20 && Math.abs(z) < 90) continue;

    leaf.position.set(x, 0.05, z);
    leaf.rotation.x = -Math.PI / 2;
    leaf.rotation.z = Math.random() * Math.PI * 2;

    // Random tilt
    leaf.rotation.y = (Math.random() - 0.5) * 0.5;

    scene.add(leaf);
  }
};
addFallenLeaves(1500);


scene.traverse(obj => {
  if (obj.isMesh) {
    obj.castShadow = true;
    obj.receiveShadow = true;
  }
});

//loop
function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  
}
animate();


//resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
