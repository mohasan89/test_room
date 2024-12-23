import { BoxGeometry, MeshStandardMaterial, type Mesh } from 'three'
import { doorDepth } from './roomParameters'

function changeDoorSize(door: Mesh, width: number, height: number) {
  door.geometry.dispose()
  door.geometry = new BoxGeometry(width, height, doorDepth)
  door.position.y = height / 2

  const material = door.material as MeshStandardMaterial
  const material2 = material.clone()
  material2.map?.repeat.set(width / 2, height / 2)
  material2.bumpMap?.repeat.set(width / 2, height / 2)

  material.dispose()
  door.material = material2
}

export default changeDoorSize
