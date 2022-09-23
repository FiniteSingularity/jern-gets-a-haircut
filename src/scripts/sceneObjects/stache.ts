import { NormalizedLandmark } from '@mediapipe/face_mesh'
import { STACHE_INDICES } from '../faceTracking/faceFeatureMeshes'

export default class Stache extends Phaser.GameObjects.Mesh {
  // debug: Phaser.GameObjects.Graphics

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

  updatePosition(stachePoints: NormalizedLandmark[]) {
    // this.debug.clear()
    // this.debug.lineStyle(1, 0x00ff00)
    const vertices = stachePoints.reduce((acc, pt) => {
      return [...acc, ...this.coordTransform(pt)]
    }, [] as number[])

    const uvs = stachePoints.reduce((acc, pt) => {
      return [...acc, pt.x, pt.y]
    }, [] as number[])

    this.clear()
    this.addVertices(vertices, uvs, STACHE_INDICES)
  }
}
