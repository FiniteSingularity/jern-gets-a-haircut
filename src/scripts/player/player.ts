import { Subscription } from 'rxjs';

import { FaceFeatures, FaceTracker } from '../faceTracking/faceTracker';
import IEnemy from '../lib/interfaces/IEnemy';
import scoreService from '../lib/services/scoreService';
import Beard from '../sceneObjects/beard';
import ForeheadTarget from '../sceneObjects/foreheadTarget';
import HeadHair from '../sceneObjects/headHair';
import PowerUpTarget from '../sceneObjects/powerUpTarget';
import TargetShield from '../sceneObjects/targetShield';
import MainScene from '../scenes/mainScene';

export default class Player extends Phaser.GameObjects.Group {
  faceTracker: FaceTracker;
  features: FaceFeatures;
  subs = new Subscription();
  private _beard: Beard; // Game group object that represents beard parts
  private _foreheadTarget: ForeheadTarget;
  private _headHair: HeadHair;
  private _targetShield: TargetShield;
  private _scoreService = scoreService;
  private _shieldStrength = 0;
  private _maxShieldStrength = 5;
  private _powerUpTarget: any;
  private _targetInterval;
  private _powerupTargetActive = false;

  constructor(scene) {
    super(scene);
    this._beard = new Beard(scene);
    this._foreheadTarget = new ForeheadTarget(scene, 0, 0);
    this._targetShield = new TargetShield(scene, 0, 0);

    // this is supposed to pulse the shield constantly, but only works on the last hit. Not sure why but it's cool
    scene.tweens.add({
      targets: this._targetShield,
      duration: 250,
      ease: 'Linear',
      yoyo: true,
      repeat: -1,
      alpha: { start: 1, from: 1, to: 0.5}
    });
    
    this._headHair = new HeadHair(scene, 0, 0);
    this._powerUpTarget = new PowerUpTarget(scene, 0, 0);
    this._powerUpTarget.setVisible(false);
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
    // setTimeout(() => {
    //   this.shieldOn();
    // }, 5000);
    this._targetInterval = setInterval(() => {
      const x = Phaser.Math.Between(300, 980);
      const y = Phaser.Math.Between(100, 360);
      this._powerUpTarget.setX(x);
      this._powerUpTarget.setY(y);
      this._powerUpTarget.setVisible(true);
      this._powerupTargetActive = true;
      setTimeout(() => {
        this.deactiveatePowerupTarget();
      }, 5000);
    }, 45000)
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

  deactiveatePowerupTarget() {
    this._powerupTargetActive = false;
    this._powerUpTarget.setVisible(false);
  }

  shieldOn() {
    this._shieldStrength = 5;
    this.deactiveatePowerupTarget();
  }

  shieldHit() {
    (this.scene as MainScene).playShieldBounce();
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
    (this.scene as MainScene).playSquishSound();
    for(let i=0; i<10; ++i) {
      this._headHair.addHair();
    }
  }

  update() {
    this._headHair.update();
    if(this._powerupTargetActive) {
      this._powerUpTarget.update();
    }
    this._targetShield.updateShield(this._shieldStrength / this._maxShieldStrength); // Percent of shield remaining
  }
}
