import { Subscription } from 'rxjs';

import { FaceFeatures, FaceTracker } from '../faceTracking/faceTracker';
import IEnemy from '../lib/interfaces/IEnemy';
import scoreService from '../lib/services/scoreService';
import Beard from '../sceneObjects/beard';
import ForeheadTarget from '../sceneObjects/foreheadTarget';
import HeadHair from '../sceneObjects/headHair';

export default class Player extends Phaser.GameObjects.Group {
  faceTracker: FaceTracker;
  features: FaceFeatures;
  subs = new Subscription();
  private _beard: Beard; // Game group object that represents beard parts
  private _foreheadTarget: ForeheadTarget;
  private _headHair: HeadHair;
  private _hitCount = 0;
  private _scoreService = scoreService;

  constructor(scene) {
    super(scene);
    this._beard = new Beard(scene);
    this._foreheadTarget = new ForeheadTarget(scene, 0, 0);
    this._headHair = new HeadHair(scene, 0, 0);

    this.faceTracker = FaceTracker.getInstance();
    this.faceTracker.setFullScreen();
    this.subs.add(
      this.faceTracker.faceFeatures$.subscribe(features => {
        this.features = features;
        if (features.faceFound) {
          this._beard.updatePosition(features);
          this._foreheadTarget.updatePosition(features);
          this._headHair.updatePosition(features);
        }
      })
    );
  }

  get beard() {
    return this._beard;
  }

  get foreheadTarget() {
    return this._foreheadTarget;
  }

  get headHair() {
    return this._headHair;
  }

  freeze() {
    this.faceTracker.freeze();
  }

  unfreeze() {
    this.faceTracker.unfreeze();
  }

  addHit(enenmy: IEnemy) {
    this._scoreService.incrementHit(1);
    this._headHair.addHair();
    this._headHair.addHair();
    this._headHair.addHair();
    this._headHair.addHair();
  }

  update() {
    this._headHair.update();
  }
}
