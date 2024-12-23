import { AmbientLight, PointLight, Light } from 'three'

function createLights(): Light[] {
  const ambientLight = new AmbientLight(0xffffff, 0.05)
  const light = new PointLight(0xffffff, 20, 0)
  light.position.set(3, 3, 3)
  light.castShadow = true

  return [ambientLight, light]
}

export default createLights
