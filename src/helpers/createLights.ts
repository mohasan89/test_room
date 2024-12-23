import { AmbientLight, DirectionalLight, Light } from 'three'

function createLights(): Light[] {
  const ambientLight = new AmbientLight(0xffffff, 0.05)
  const directionalLight = new DirectionalLight(0xffffff, 2)
  directionalLight.position.set(10, 10, 10)
  return [ambientLight, directionalLight]
}

export default createLights
