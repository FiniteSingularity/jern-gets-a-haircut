import { NormalizedLandmark } from '@mediapipe/face_mesh'
import { CHINSTRAP_INDICES } from '../faceTracking/faceFeatureMeshes'

export default class ChinStrap extends Phaser.GameObjects.Mesh {
  //debug: Phaser.GameObjects.Graphics

  constructor(scene, x, y) {
    super(scene, x, y, 'black')
    scene.add.existing(this)
    this.hideCCW = false
    this.setOrtho(this.width, this.height)
    // this.debug = scene.add.graphics();
    // this.setDebug(this.debug);
  }

  coordTransform(pt: NormalizedLandmark) {
    return [(pt.x - 0.5) * this.width, (-pt.y + 0.5) * this.height]
  }

  updatePosition(chinStrapPoints: NormalizedLandmark[]) {
    // this.debug.clear()
    // this.debug.lineStyle(1, 0x333333)
    const vertices = chinStrapPoints.reduce((acc, pt) => {
      return [...acc, ...this.coordTransform(pt)]
    }, [] as number[])

    const uvs = chinStrapPoints.reduce((acc, pt) => {
      return [...acc, pt.x, pt.y]
    }, [] as number[])

    this.clear()
    this.addVertices(vertices, uvs, CHINSTRAP_INDICES)
  }
}
