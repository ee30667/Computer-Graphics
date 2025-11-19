import * as THREE from 'three'
import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry.js'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 10 

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const textureLoader = new THREE.TextureLoader()

const sphereTexture = textureLoader.load('textures/traditional.jpg')
const latheTexture  = textureLoader.load('textures/flamur.jpg')
const teapotTexture = textureLoader.load('textures/lathe.jpeg')



const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1.2, 32, 32), 
  new THREE.MeshBasicMaterial({ map: sphereTexture })
)
sphere.position.x = -6  
scene.add(sphere)



const points = []
for (let i = 0; i < 15; i++) {
  const x = Math.sin(i * 0.25) * 1.5 + 1   
  const y = (i - 7) * 0.5                  
  points.push(new THREE.Vector2(x, y))
}

const latheGeometry = new THREE.LatheGeometry(points, 80)

const lathe = new THREE.Mesh(
  latheGeometry,
  new THREE.MeshBasicMaterial({ map: latheTexture })
)

lathe.position.x = 0
scene.add(lathe)


const teapot = new THREE.Mesh(
  new TeapotGeometry(1.5, 12, true, true, true, true, true), 
  new THREE.MeshBasicMaterial({ map: teapotTexture })
)
teapot.position.x = 6   
scene.add(teapot)


function animate() {
  requestAnimationFrame(animate)

  sphere.rotation.y += 0.01
  sphere.rotation.x += 0.005

  lathe.rotation.y += 0.01

  teapot.rotation.y += 0.01

  renderer.render(scene, camera)
}

animate()
