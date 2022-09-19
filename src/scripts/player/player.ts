import { Subscription } from 'rxjs'

import { FaceTracker } from '../faceTracking/faceTracker'
import Beard from '../sceneObjects/beard'
import HeadHair from '../sceneObjects/headHair'
import SoulPatch from '../sceneObjects/soulPatch'

export default class Player extends Phaser.GameObjects.Group {
  faceTracker: FaceTracker
  subs = new Subscription()
  hair: HeadHair
  beard: Beard
  soulPatch: SoulPatch
  constructor(scene) {
    super(scene)
    this.hair = new HeadHair(scene, 0, 0)
    this.soulPatch = new SoulPatch(scene, 640, 360)
    this.beard = new Beard(scene, 0, 0)
    this.add(this.hair, true)
    this.add(this.beard, true)
    this.add(this.soulPatch, true)

    this.faceTracker = FaceTracker.getInstance()
    this.subs = this.faceTracker.faceFeatures$.subscribe(features => {
      if (features.faceFound) {
        this.hair.updatePosition(features.forehead)
        this.beard.updatePosition(features.jawline)
        this.soulPatch.updatePosition(features.soulPatch)
      }
    })
  }
}
