import { AmbientLight, PointLight, Light } from 'three'

function createLights(): Light[] {
  const ambientLight = new AmbientLight(0xffffff, 0.05)
  const light = new PointLight(0xffffff, 20, 0)
  light.position.set(4, 4, 4)
  light.castShadow = true

  return [ambientLight, light]
}

export default createLights
