import { FaceFeatures } from '../faceTracking/faceTracker'
import ChinStrap from './chinStrap'
import SoulPatch from './soulPatch'
import Stache from './stache'

export default class Beard extends Phaser.GameObjects.Group {
  private _soulPatch: SoulPatch
  private _chinStrap: ChinStrap
  private _stache: Stache

  constructor(scene: Phaser.Scene) {
    super(scene)
    scene.add.existing(this)
    this._soulPatch = new SoulPatch(scene, 640, 360)

    this._chinStrap = new ChinStrap(scene, 640, 360)
    this.add(this._chinStrap, true)
    this._stache = new Stache(scene, 640, 360)
    this.add(this._stache, true)
  }

  get soulPatch() {
    return this._soulPatch
  }

  get chinStrap() {
    return this._chinStrap
  }

  get stache() {
    return this._stache
  }

  addPhysicsCollsion(obj: Phaser.GameObjects.GameObject) {
    this.scene.physics.add.collider(obj, this._soulPatch._soulPatchCollider)
  }

  updatePosition(features: FaceFeatures) {
    if (features.faceFound) {
      //this.beard.updatePosition(features.jawline)
      this._soulPatch.updatePosition(features.soulPatch)
      this._chinStrap.updatePosition(features.chinstrap)
      this._stache.updatePosition(features.stache)
    }
  }
}
