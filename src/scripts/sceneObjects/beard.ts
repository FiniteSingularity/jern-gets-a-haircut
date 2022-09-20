import { FaceFeatures } from '../faceTracking/faceTracker'
import ChinStrap from './chinStrap'
import SoulPatch from './soulPatch'
import Stache from './stache'

export default class Beard extends Phaser.GameObjects.Group {
  soulPatch: SoulPatch
  chinStrap: ChinStrap
  stache: Stache

  constructor(scene) {
    super(scene)
    scene.add.existing(this)
    this.soulPatch = new SoulPatch(scene, 640, 360)
    this.add(this.soulPatch, true)
    this.chinStrap = new ChinStrap(scene, 640, 360)
    this.add(this.chinStrap, true)
    this.stache = new Stache(scene, 640, 360)
    this.add(this.stache, true)
  }

  updatePosition(features: FaceFeatures) {
    if (features.faceFound) {
      //this.beard.updatePosition(features.jawline)
      this.soulPatch.updatePosition(features.soulPatch)
      this.chinStrap.updatePosition(features.chinstrap)
      this.stache.updatePosition(features.stache)
    }
  }
}
