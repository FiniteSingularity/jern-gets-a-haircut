import { GameObjects, Physics } from 'phaser'
import { Subscription } from 'rxjs'

import { FaceFeatures, FaceTracker } from '../faceTracking/faceTracker'
import Beard from '../sceneObjects/beard'
import ForeheadTarget from '../sceneObjects/foreheadTarget'

export default class Player extends Phaser.GameObjects.Group {
  faceTracker: FaceTracker
  features: FaceFeatures
  subs = new Subscription()
  private _beard: Beard // Game group object that represents beard parts
  private _foreheadTarget: ForeheadTarget;
  
  constructor(scene) {
    super(scene)
    this._beard = new Beard(scene)
    this._foreheadTarget = new ForeheadTarget(scene, 0, 0);

    this.faceTracker = FaceTracker.getInstance()
    this.subs = this.faceTracker.faceFeatures$.subscribe(features => {
      this.features = features
      if (features.faceFound) {
        this._beard.updatePosition(features)
        this._foreheadTarget.updatePosition(features);
      }
    })
  }

  get beard() {
    return this._beard;
  }

  get foreheadTarget() {
    return this._foreheadTarget;
  }

  update() {}
}
