import { NormalizedLandmark } from '@mediapipe/face_mesh'

export default class Beard extends Phaser.GameObjects.Ellipse {
  constructor(scene, x, y) {
    super(scene, x, y, 50, 50, 0x0000ff, 0.5)
    scene.add.existing(this)
  }

  updatePosition(jawline: NormalizedLandmark[]) {
    this.setX(jawline[6].x * this.scene.cameras.main.width)
    this.setY(jawline[6].y * this.scene.cameras.main.height)
  }
}
