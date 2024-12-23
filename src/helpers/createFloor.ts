import { MeshStandardMaterial, PlaneGeometry, Mesh } from 'three'

function createFloor(): Mesh {
  const geometry = new PlaneGeometry(30, 30)
  const matrial = new MeshStandardMaterial({ color: '#ffffff', side: 2 })
  const mesh = new Mesh(geometry, matrial)
  mesh.rotateX(-Math.PI / 2)
  return mesh
}

export default createFloor
