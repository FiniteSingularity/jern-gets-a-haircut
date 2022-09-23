import { FaceFeatures } from "../faceTracking/faceTracker";

export default class ForeheadTarget extends Phaser.GameObjects.Ellipse {
  constructor(scene, x, y) {
    super(scene, x, y, 100, 100, 0x0000ff, 0.5);
    scene.add.existing(this);
    //scene.physics.add.existing(this)
  }

  updatePosition(features: FaceFeatures) {
    // this.debug.clear()
    // this.debug.lineStyle(1, 0x00ff00)
    const foreheadPoint = features.forehead[7];

    this.setX(foreheadPoint.x * this.scene.cameras.main.width);
    this.setY(foreheadPoint.y * this.scene.cameras.main.height);
  }
}
