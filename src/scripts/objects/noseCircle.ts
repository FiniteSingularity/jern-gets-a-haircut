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
    this.setupMediaPipe()
  }

  setupMediaPipe() {
    this.videoElement = document.getElementById('input-video') as HTMLVideoElement
    this.canvasElement = document.getElementById('output-canvas') as HTMLCanvasElement
    this.controlsElement = document.getElementById('control-panel') as HTMLDivElement

    this.canvasCtx = this.canvasElement.getContext('2d')!
    this.faceMesh = new FaceMesh({
      locateFile: (file: any) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
      }
    })

    this.faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
      selfieMode: true
    })

    this.faceMesh.onResults(this.onResults)

    this.camera = new Camera(this.videoElement, {
      onFrame: async () => {},
      width: 1280,
      height: 720
    })
    this.camera.start()

    this.controls = new ControlPanel(this.controlsElement, {})
      .add([
        new StaticText({ title: 'MediaPipe Face Mesh' }),
        new SourcePicker({
          onFrame: async (input: InputImage, size: Rectangle) => {
            const aspect = size.height / size.width
            let width: number, height: number
            if (window.innerWidth > window.innerHeight) {
              height = window.innerHeight
              width = height / aspect
            } else {
              width = window.innerWidth
              height = width * aspect
            }
            this.canvasElement.width = width
            this.canvasElement.height = height
            await this.faceMesh.send({ image: input })
          }
        })
      ])
      .on(_ => {})
  }

  onResults = (results: Results) => {
    document.body.classList.add('loaded')
    this.canvasCtx.save()
    this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height)
    this.canvasCtx.drawImage(results.image, 0, 0, this.canvasElement.width, this.canvasElement.height)
    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        // Landmark 4 is the tip of the nose.
        // landmark ids can be seen in this image here:
        // https://raw.githubusercontent.com/rcsmit/python_scripts_rcsmit/master/extras/Gal_Gadot_by_Gage_Skidmore_4_5000x5921_annotated_white_letters.jpg
        const normalizedPt = landmarks[4]
        this.setX(normalizedPt.x * this.scene.cameras.main.width)
        this.setY(normalizedPt.y * this.scene.cameras.main.height)
      }
    }
    this.canvasCtx.restore()
  }
}
