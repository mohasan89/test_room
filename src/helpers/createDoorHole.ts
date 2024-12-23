import { ExtrudeGeometry, Mesh, Shape, type Group } from 'three'
import { roomHeight, roomLength, wallDepth } from './roomParameters'

function createDoorHole(walls: Group, doorWidth: number, doorHeight: number): void {
  const wall = walls.children.filter((wall) => wall.userData.isDoorWall)[0]
  if (!wall || !(wall instanceof Mesh)) {
    console.error('no walls')
    return
  }

  const wallShape = new Shape()
    .moveTo(0, 0)
    .lineTo(roomLength, 0)
    .lineTo(roomLength, roomHeight)
    .lineTo(0, roomHeight)
    .lineTo(0, 0)

  const doorHole = new Shape()
    .moveTo((roomLength - doorWidth) / 2, 0)
    .lineTo((roomLength + doorWidth) / 2, 0)
    .lineTo((roomLength + doorWidth) / 2, doorHeight)
    .lineTo((roomLength - doorWidth) / 2, doorHeight)
    .lineTo((roomLength - doorWidth) / 2, 0)

  wallShape.holes.push(doorHole)

  const extrudeSettings = {
    depth: wallDepth,
    bevelEnabled: false,
    bevelSegments: 2,
    steps: 2,
    bevelSize: wallDepth,
    bevelThickness: wallDepth,
  }
  const geometry = new ExtrudeGeometry(wallShape, extrudeSettings)
  geometry.center()
  wall.geometry.dispose()
  wall.geometry = geometry
}

export default createDoorHole
