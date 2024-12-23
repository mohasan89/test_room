import { Camera, Mesh, MeshBasicMaterial, Raycaster, Vector2, Vector3, type Scene } from 'three'
import GUI from 'three/examples/jsm/libs/lil-gui.module.min'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import { TextGeometry } from 'three/examples/jsm/Addons.js'
//@ts-ignore
import { Font, FontLoader } from 'three/addons/loaders/FontLoader.js'
let font: Font | undefined = undefined

type Obj = {
  isMeasure: boolean
  measureFunction?: (event: MouseEvent) => void
  measure: () => void
}

function measureHandler(scene: Scene, camera: Camera, gui: GUI): void {
  const fontLoader = new FontLoader()
  fontLoader.load('/poppins.typeface.json', (f: Font) => {
    font = f
  })
  const obj: Obj = {
    isMeasure: false,
    measureFunction: undefined,
    measure() {
      this.isMeasure = !this.isMeasure
      if (this.isMeasure) {
        const pointlist: Vector3[] = []
        this.measureFunction = function (e: MouseEvent) {
          onPointClick(e, camera, scene, pointlist)
        }
        window.addEventListener('click', this.measureFunction)
      } else {
        if (this.measureFunction) window.removeEventListener('click', this.measureFunction)
        removeMeasure(scene)
      }
    },
  }

  gui.add(obj, 'measure')
}

function get2dVector(event: MouseEvent): Vector2 {
  const pointer = new Vector2()
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
  return pointer
}

function onPointClick(event: MouseEvent, camera: Camera, scene: Scene, pointList: Vector3[]): void {
  const vec2 = get2dVector(event)
  const raycaster = new Raycaster()
  raycaster.setFromCamera(vec2, camera)
  const intersects = raycaster.intersectObjects(scene.children)
  const obj = intersects.filter((item) => item.object instanceof Mesh)[0]
  if (!obj) return
  pointList.push(obj.point)
  if (pointList.length < 2) return
  if (pointList.length > 2) pointList.splice(0, 1)
  removeMeasure(scene)
  const geometry = new MeshLineGeometry()
  const coords = pointList.map((v) => [v.x, v.y, v.z]).flat()
  geometry.setPoints(coords)
  const material = new MeshLineMaterial({
    color: 0xff0000,
    lineWidth: 0.1,
    resolution: new Vector2(window.innerWidth, window.innerHeight),
  })
  const mesh = new Mesh(geometry, material)
  mesh.userData.isMeasure = true
  const distance = calculateDistance(pointList[0], pointList[1])
  if (!font) return
  const textGeometry = new TextGeometry(distance.toString(), {
    font: font,
    size: 0.2,
    depth: 0.1,
    curveSegments: 12,
    bevelEnabled: false,
    bevelThickness: 0,
    bevelSize: 0,
    bevelSegments: 0,
  })
  const textMatrial = new MeshBasicMaterial({ color: 0xff0000 })
  const textMesh = new Mesh(textGeometry, textMatrial)
  textMesh.userData.isMeasure = true
  const midPoint = calculateMidPoint(pointList[0], pointList[1])
  textMesh.position.set(midPoint[0], midPoint[1], midPoint[2])
  scene.add(mesh)
  scene.add(textMesh)
}

function calculateDistance(a: Vector3, b: Vector3): number {
  const distance = ((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2) ** 0.5
  return Math.round(distance * 100) / 100
}
function calculateMidPoint(a: Vector3, b: Vector3): number[] {
  return [(a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2]
}
function removeMeasure(scene: Scene): void {
  scene.children.filter((item) => item.userData.isMeasure).forEach((item) => scene.remove(item))
}
export default measureHandler
