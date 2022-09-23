import { NormalizedLandmark } from '@mediapipe/face_mesh'

export default class HeadHair extends Phaser.GameObjects.Ellipse {
  constructor(scene, x, y) {
    super(scene, x, y, 50, 50, 0xff0000, 0.5)
    scene.add.existing(this)
  }

  updatePosition(forehead: NormalizedLandmark[]) {
    this.setX(forehead[7].x * this.scene.cameras.main.width)
    this.setY(forehead[7].y * this.scene.cameras.main.height)
  }
}
