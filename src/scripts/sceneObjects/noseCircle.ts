import { Camera } from '@mediapipe/camera_utils'
import { ControlPanel, InputImage, Rectangle, SourcePicker, StaticText } from '@mediapipe/control_utils'
import { FaceMesh, Results } from '@mediapipe/face_mesh'

export default class NoseCircle extends Phaser.GameObjects.Ellipse {
  videoElement: HTMLVideoElement
  canvasElement: HTMLCanvasElement
  controlsElement: HTMLDivElement
  canvasCtx: CanvasRenderingContext2D
  faceMesh: FaceMesh
  camera: Camera
  controls: ControlPanel

  constructor(scene, x, y) {
    super(scene, x, y, 50, 50, 0xff0000, 0.5)
    scene.add.existing(this)
    //scene.physics.add.existing(this)
  }

}
