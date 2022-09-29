import { Subscription } from 'rxjs';

import { FaceFeatures, FaceTracker } from '../faceTracking/faceTracker';
import IEnemy from '../lib/interfaces/IEnemy';
import scoreService from '../lib/services/scoreService';
import Beard from '../sceneObjects/beard';
import ForeheadTarget from '../sceneObjects/foreheadTarget';
import HeadHair from '../sceneObjects/headHair';
import TargetShield from '../sceneObjects/targetShield';

export default class Player extends Phaser.GameObjects.Group {
  faceTracker: FaceTracker;
  features: FaceFeatures;
  subs = new Subscription();
  private _beard: Beard; // Game group object that represents beard parts
  private _foreheadTarget: ForeheadTarget;
  private _headHair: HeadHair;
  private _targetShield: TargetShield;
  private _hitCount = 0;
  private _scoreService = scoreService;
  private _shieldStrength = 0;

  constructor(scene) {
    super(scene);
    this._beard = new Beard(scene);
    this._foreheadTarget = new ForeheadTarget(scene, 0, 0);
    this._targetShield = new TargetShield(scene, 0, 0);
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
          this._targetShield.updatePosition(features);
        }
      })
    );
    setTimeout(() => {
      this.shieldOn();
    }, 5000);
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

  get targetShield() {
    return this._targetShield;
  }

  get shieldUp() {
    return this._shieldStrength > 0;
  }

  shieldOn() {
    this._shieldStrength = 5;
  }

  shieldHit() {
    this._shieldStrength--;
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
    this._targetShield.updateShield(this._shieldStrength > 0);
  }
}
