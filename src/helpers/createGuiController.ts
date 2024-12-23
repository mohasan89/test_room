import {
  defualtDoorHeight,
  defualtDoorWidth,
  maxDoorHeight,
  maxDoorWidth,
  minDoorHeight,
  minDoorWidth,
} from './roomParameters'
import lilGui, { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'

export type ControllerObjType = { width: number; height: number; keepAspect: boolean }

function createGuiController(): { obj: ControllerObjType; gui: GUI } {
  const gui = new lilGui()
  const obj = {
    width: defualtDoorWidth,
    height: defualtDoorHeight,
    keepAspect: true,
  }
  gui.$title.innerText = 'Контроллер'

  gui.add(obj, 'width', minDoorWidth, maxDoorWidth, 0.2)
  gui.add(obj, 'height', minDoorHeight, maxDoorHeight, 0.2)
  gui.add(obj, 'keepAspect')
  return { gui, obj }
}

export default createGuiController
