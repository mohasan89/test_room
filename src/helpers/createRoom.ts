import { BoxGeometry, Group, Mesh, MeshStandardMaterial } from 'three'
import { roomHeight, roomLength, roomWidth, wallDepth } from './roomParameters'

function createRoom(): Group {
  const group = new Group()
  group.userData.isRoom = true

  const matrial = new MeshStandardMaterial({ color: 0xd5cfcf })

  const longWallGeometry = new BoxGeometry(roomLength, roomHeight, wallDepth)
  const longWallMesh = new Mesh(longWallGeometry, matrial)
  longWallMesh.userData.isDoorWall = true
  group.add(longWallMesh)

  const longWall2 = longWallMesh.clone()
  longWall2.position.set(0, 0, -roomWidth)
  group.add(longWall2)

  const shortWallGeometry = new BoxGeometry(roomWidth - wallDepth, roomHeight, wallDepth)
  const shortWallMesh = new Mesh(shortWallGeometry, matrial)
  shortWallMesh.position.set(roomLength / 2 - wallDepth / 2, 0, -roomWidth / 2)
  shortWallMesh.rotateY(Math.PI / 2)
  group.add(shortWallMesh)

  const shortWallMesh2 = shortWallMesh.clone()
  shortWallMesh2.position.set(-roomLength / 2 + wallDepth / 2, 0, -roomWidth / 2)
  group.add(shortWallMesh2)

  group.position.set(0, roomHeight / 2, roomWidth / 2)
  return group
}

export default createRoom
