import { BoxGeometry, Mesh, MeshStandardMaterial, RepeatWrapping, TextureLoader } from 'three'
import { defualtDoorHeight, defualtDoorWidth, doorDepth, roomWidth } from './roomParameters'

function createDoor(): Mesh {
  const geomertry = new BoxGeometry(defualtDoorWidth, defualtDoorHeight, doorDepth)

  const textureLoader = new TextureLoader()
  const texture = textureLoader.load('./textures/oak_veneer.jpg', (texture) => {
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
  })

  const bumpMap = textureLoader.load('./textures/oak_veneer_height.jpg', (texture) => {
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
  })

  texture.repeat.set(defualtDoorWidth / 2, defualtDoorHeight / 2)
  bumpMap.repeat.set(defualtDoorWidth / 2, defualtDoorHeight / 2)

  const matrial = new MeshStandardMaterial({
    map: texture,
    bumpMap: bumpMap,
    bumpScale: 1,
  })
  const mesh = new Mesh(geomertry, matrial)
  mesh.castShadow = true
  mesh.receiveShadow = true
  mesh.position.set(0, 1, roomWidth / 2)
  mesh.userData.isDoor = true
  mesh.userData.width = defualtDoorWidth
  mesh.userData.height = defualtDoorHeight

  return mesh
}

export default createDoor
