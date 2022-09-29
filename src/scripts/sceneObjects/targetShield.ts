import { FaceFeatures } from "../faceTracking/faceTracker";

export default class TargetShield extends Phaser.GameObjects.Ellipse {
  constructor(scene, x, y) {
    super(scene, x, y, 175, 175, 0x99ffff, 0.5);
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

  updateShield(shieldUp: boolean) {
    this.setAlpha(shieldUp ? 1.0 : 0.0);
  }
}
