import { Mesh, MeshStandardMaterial, SphereGeometry, TorusGeometry } from 'three'

function createGoemetry(): Mesh[] {
  const goem1 = new SphereGeometry(0.75, 16, 100)
  const material = new MeshStandardMaterial({ color: 0xef4444 })
  const sphere = new Mesh(goem1, material)
  sphere.castShadow = true
  sphere.receiveShadow = true
  sphere.position.set(2, 1.3, 3)

  const goem2 = new TorusGeometry(0.75, 0.2, 10, 40)
  const material2 = new MeshStandardMaterial({ color: 0x06b6d4 })
  const torus = new Mesh(goem2, material2)
  torus.castShadow = true
  torus.receiveShadow = true
  torus.position.set(-2, 1, 0.75)
  torus.rotateX(Math.PI / 2)
  return [sphere, torus]
}

export default createGoemetry
