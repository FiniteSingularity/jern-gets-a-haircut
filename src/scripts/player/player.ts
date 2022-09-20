import { Subscription } from 'rxjs'

import { FaceFeatures, FaceTracker } from '../faceTracking/faceTracker'
import Beard from '../sceneObjects/beard'

export default class Player extends Phaser.GameObjects.Group {
  faceTracker: FaceTracker
  features: FaceFeatures
  subs = new Subscription()
  beard: Beard // Game group object that represents beard parts
  constructor(scene) {
    super(scene)
    this.beard = new Beard(scene)

    this.faceTracker = FaceTracker.getInstance()
    this.subs = this.faceTracker.faceFeatures$.subscribe(features => {
      this.features = features
      if (features.faceFound) {
        this.beard.updatePosition(features)
      }
    })
  }

  update() {}
}
