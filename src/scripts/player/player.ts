import { GameObjects, Physics } from 'phaser'
import { Subscription } from 'rxjs'

import { FaceFeatures, FaceTracker } from '../faceTracking/faceTracker'
import Beard from '../sceneObjects/beard'

export default class Player extends Phaser.GameObjects.Group {
  faceTracker: FaceTracker
  features: FaceFeatures
  subs = new Subscription()
  private _beard: Beard // Game group object that represents beard parts
  constructor(scene) {
    super(scene)
    this._beard = new Beard(scene)

    this.faceTracker = FaceTracker.getInstance()
    this.subs = this.faceTracker.faceFeatures$.subscribe(features => {
      this.features = features
      if (features.faceFound) {
        this._beard.updatePosition(features)
      }
    })
  }

  get beard() {
    return this._beard;
  }

  update() {}
}
