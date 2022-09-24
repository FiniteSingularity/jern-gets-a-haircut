import { FaceFeatures } from "../faceTracking/faceTracker";

export default class ForeheadTarget extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'target');
    scene.add.existing(this);
    this.setSize(72, 72);
    this.setDisplaySize(72, 72);
  }

  updatePosition(features: FaceFeatures) {
    // this.debug.clear()
    // this.debug.lineStyle(1, 0x00ff00)
    const foreheadPoint = features.forehead[7];

    this.setX(foreheadPoint.x * this.scene.cameras.main.width);
    this.setY(foreheadPoint.y * this.scene.cameras.main.height);
  }
}
