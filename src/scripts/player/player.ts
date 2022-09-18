import { Subscription } from 'rxjs'

import { FaceTracker } from '../faceTracking/faceTracker'
import Beard from '../sceneObjects/beard'
import HeadHair from '../sceneObjects/headHair'

export default class Player extends Phaser.GameObjects.Group {
  faceTracker: FaceTracker
  subs = new Subscription()
  hair: HeadHair
  beard: Beard
  constructor(scene) {
    super(scene)
    this.hair = new HeadHair(scene, 0, 0)
    this.beard = new Beard(scene, 0, 0)
    this.add(this.hair, true)
    this.add(this.beard, true)

    this.faceTracker = FaceTracker.getInstance()
    this.subs = this.faceTracker.faceFeatures$.subscribe(features => {
      if (features.faceFound) {
        this.hair.updatePosition(features.forehead)
        this.beard.updatePosition(features.jawline)
      }
    })
  }
}
