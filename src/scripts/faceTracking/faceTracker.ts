import { BehaviorSubject } from 'rxjs'

import { Camera } from '@mediapipe/camera_utils'
import { ControlPanel, InputImage, Rectangle, SourcePicker, StaticText } from '@mediapipe/control_utils'
import { FaceMesh, NormalizedLandmark, Results } from '@mediapipe/face_mesh'
import { CHINSTRAP_POINTS, FOREHEAD_POINTS, JAWLINE_POINTS, SOUL_PATCH_POINTS, STACHE_POINTS } from './faceFeatureMeshes'

// Defines the landmark points added to the face mesh observable.
export interface FaceFeatures {
  faceFound: boolean
  forehead: NormalizedLandmark[]
  jawline: NormalizedLandmark[]
  chinstrap: NormalizedLandmark[]
  soulPatch: NormalizedLandmark[]
  stache: NormalizedLandmark[]
}


export class FaceTracker {
  private videoElement: HTMLVideoElement
  private canvasElement: HTMLCanvasElement
  private controlsElement: HTMLDivElement
  private canvasCtx: CanvasRenderingContext2D
  private faceMesh: FaceMesh
  private camera: Camera
  private controls: ControlPanel
  private _faceFeatures = new BehaviorSubject<FaceFeatures>({
    faceFound: false,
    forehead: [],
    chinstrap: [],
    jawline: [],
    soulPatch: [],
    stache: [],
  })

  private static instance: FaceTracker

  private constructor() {
    this.setupMediaPipe()
  }

  public static getInstance(): FaceTracker {
    if (!FaceTracker.instance) {
      FaceTracker.instance = new FaceTracker()
    }
    return FaceTracker.instance
  }

  // Face Features observable (emits event whenever new face mesh data is obtained)
  public get faceFeatures$() {
    return this._faceFeatures.asObservable()
  }

  private setupMediaPipe() {
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
    // redraw the camera frame in the camera canvas element
    this.canvasCtx.save()
    this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height)
    this.canvasCtx.drawImage(results.image, 0, 0, this.canvasElement.width, this.canvasElement.height)

    // Extract the face landmarks of interest, and fire off new observable event
    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        this._faceFeatures.next({
          faceFound: true,
          forehead: FOREHEAD_POINTS.map(id => landmarks[id]),
          jawline: JAWLINE_POINTS.map(id => landmarks[id]),
          chinstrap: CHINSTRAP_POINTS.map(id => landmarks[id]),
          soulPatch: SOUL_PATCH_POINTS.map(id => landmarks[id]),
          stache: STACHE_POINTS.map(id => landmarks[id])
        })
      }
    }

    // Clean up after ourselves.
    this.canvasCtx.restore()
  }
}
