import { FaceFeatures } from "../faceTracking/faceTracker";

export default class TargetShield extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'space-shield');
    scene.add.existing(this);
    //scene.physics.add.existing(this)

    this.scale = .6;  // set size of shield
  }

  updatePosition(features: FaceFeatures) {
    // this.debug.clear()
    // this.debug.lineStyle(1, 0x00ff00)
    const foreheadPoint = features.forehead[7];

    this.setX(foreheadPoint.x * this.scene.cameras.main.width);
    this.setY(foreheadPoint.y * this.scene.cameras.main.height);
  }

  updateShield(shieldPercentage: number) {
    if (shieldPercentage <= 0 ){
      this.setAlpha(0.0);
    } else {
      if (shieldPercentage >= 1) {
        this.setTintFill(0x0000FF);
      } else if (shieldPercentage >= .75) {
        this.setTintFill(0x00FF00);
      } else if (shieldPercentage >= .5) {
        this.setTintFill(0xFFFF00);
      } else if (shieldPercentage >= .25) {
        this.setTintFill(0xFF0000);
      }       
      this.setAlpha(.8);
    }
  }
}
