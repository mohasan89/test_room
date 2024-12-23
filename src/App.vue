<script setup lang="ts">
import { GridHelper, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three'
import { onMounted, ref } from 'vue'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import createRoom from './helpers/createRoom'
import createDoor from './helpers/createDoor'
import Stats from 'three/examples/jsm/libs/stats.module'
import changeDoorSize from './helpers/changeDoorSize'
import { defualtDoorHeight, defualtDoorWidth } from './helpers/roomParameters'
import createDoorHole from './helpers/createDoorHole'
import createFloor from './helpers/createFloor'
import createLights from './helpers/createLights'
import createGuiController, { type ControllerObjType } from './helpers/createGuiController'
import measureHandler from './helpers/measureHandler'

const threeDiv = ref<HTMLDivElement>()

const scene = new Scene()
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(3, 3, 6)
camera.lookAt(new Vector3(0, 0, 0))
scene.add(camera)

const renderer = new WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

createLights().forEach((light) => scene.add(light))

scene.add(createFloor())
scene.add(new GridHelper(30, 50))
const controls = new OrbitControls(camera, renderer.domElement)
controls.update()

const room = createRoom()
scene.add(room)

const door = createDoor()
scene.add(door)
createDoorHole(room, defualtDoorWidth, defualtDoorHeight)

const stats = new Stats()
const { gui } = createGuiController()
gui.onChange((changeEvent) => {
  if (!changeEvent?.object) return
  const { width, height } = changeEvent.object as ControllerObjType
  const doorWidth = width ?? defualtDoorWidth
  const doorHeight = height ?? defualtDoorHeight
  changeDoorSize(door, doorWidth, doorHeight)
  createDoorHole(room, doorWidth, doorHeight)
})

function animate() {
  requestAnimationFrame(animate)
  controls.update()
  stats.update()
  renderer.render(scene, camera)
}

window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  threeDiv.value?.appendChild(renderer.domElement)
  document.body.appendChild(stats.dom)
  animate()
  measureHandler(scene, camera, gui)
})
</script>

<template>
  <div id="three_container" ref="threeDiv"></div>
</template>

<style lang="css" scoped>
#three_container {
  width: 100vw;
  height: 100vh;
  background-color: blanchedalmond;
}
</style>
