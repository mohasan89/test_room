import { MeshStandardMaterial, PlaneGeometry, Mesh } from 'three'

function createFloor(): Mesh {
  const geometry = new PlaneGeometry(30, 30)
  const matrial = new MeshStandardMaterial({ color: '#ffffff', metalness: 0.2 })
  const mesh = new Mesh(geometry, matrial)
  mesh.castShadow = true
  mesh.receiveShadow = true

  mesh.rotateX(-Math.PI / 2)
  return mesh
}

export default createFloor
