import { NormalizedLandmark } from '@mediapipe/face_mesh'
import { single } from 'rxjs';
import { FaceFeatures } from '../faceTracking/faceTracker';

export default class HeadHair extends Phaser.GameObjects.Container {
  private _headScale: number;

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

  randomSproutLocation() {
    const radius = 100;
    const angle = Phaser.Math.Angle.Random()/2.0;
    return {
      x: radius * Math.sin(angle),
      y: -radius * Math.cos(angle)
    };
  }

  randomSprout(points: number) {
    const minRadius = 100;
    const maxRadius = 200 + Phaser.Math.Between(-25, 70);
    const angle = Phaser.Math.Angle.Random() / 2.0 + Math.PI / 2.0;
    return [
      ...Array(points).keys()
    ].map(val => {
        const r = val/(points-1)*(maxRadius-minRadius) + minRadius;
        return new Phaser.Math.Vector2(r * Math.cos(angle), -r * Math.sin(angle));
      }
    );
  }

  addHair() {
    const hsl = Phaser.Display.Color.HSVColorWheel();
    console.log(hsl);
    const numPoints = 10;
    const points = this.randomSprout(numPoints);
    const colors = [...Array(numPoints).keys()].map(val => {
      const index = Math.floor((val/(numPoints-1)) * 359);
      const hslColor = hsl[index];
      return Phaser.Display.Color.GetColor(hslColor.r, hslColor.g, hslColor.b);
    })
    console.log(colors);
    const hair = new Phaser.GameObjects.Rope(this.scene, 0, 0, 'rope-hair', null, points, false, colors);
    this.add(hair);
  }


}
