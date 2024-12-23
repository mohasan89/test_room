import { defualtDoorHeight, defualtDoorWidth } from './roomParameters'
import lilGui, { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'

export type ControllerObjType = { width: number; height: number }

function createGuiController(): { obj: ControllerObjType; gui: GUI } {
  const gui = new lilGui()
  const obj = {
    width: defualtDoorWidth,
    height: defualtDoorHeight,
    measure: false,
  }
  gui.$title.innerText = 'Контроллер'

  gui.add(obj, 'width', 0.5, 4, 0.2)
  gui.add(obj, 'height', 1, 3.2, 0.2)
  return { gui, obj }
}

export default createGuiController
