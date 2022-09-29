import { FaceFeatures } from '../faceTracking/faceTracker';
import HairFollicle from './hairFollicle';

export default class HeadHair extends Phaser.GameObjects.Container {
  private _headScale: number;
  private _hairs: HairFollicle[] = [];
  constructor(scene, x, y) {
    super(scene, x, y)
    scene.add.existing(this)
  }

  updatePosition(features: FaceFeatures) {
    if(features.faceFound) {
      const forehead = features.forehead;
      const pt1 = forehead[6];
      const pt2 = forehead[8];
      const pt3 = forehead[0];
      const pt4 = forehead[14];
      const theta = Phaser.Math.Angle.Between(pt1.x, pt1.y, pt2.x, pt2.y);
      this.setX(forehead[7].x * this.scene.cameras.main.width);
      this.setY(forehead[7].y * this.scene.cameras.main.height);
      this.setRotation(theta*0.7);
      this._headScale = Phaser.Math.Distance.Between(pt3.x, pt3.y, pt4.x, pt4.y);
    }
  }

  addHair() {
    this._hairs.push(new HairFollicle(this.scene, this, 0, 0));
  }

  update() {
    this._hairs.forEach(hair => hair.update());
  }

}
