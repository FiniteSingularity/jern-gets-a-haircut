import { NormalizedLandmark } from '@mediapipe/face_mesh'

export default class SoulPatch extends Phaser.GameObjects.Group {
  _soulPatchMesh: SoulPatchMesh
  _soulPatchCollider: Phaser.Types.Physics.Arcade.SpriteWithStaticBody
  constructor(scene: Phaser.Scene, x, y) {
    console.log('Soul Patch Constructor')
    super(scene)
    this._soulPatchMesh = new SoulPatchMesh(scene, x, y)
    this.add(this._soulPatchMesh, true)
    this._soulPatchCollider = scene.physics.add.staticSprite(0, 0, 'sp')
    this._soulPatchCollider.setDebug(false, false, 0x00ff00)
    this._soulPatchCollider.setCircle(8)
  }

  updatePosition(soulPatchPoints: NormalizedLandmark[]) {
    this._soulPatchMesh.updatePosition(soulPatchPoints)
    this._soulPatchCollider.setX(soulPatchPoints[1].x * this.scene.cameras.main.width)
    this._soulPatchCollider.setY(soulPatchPoints[1].y * this.scene.cameras.main.height)
    this._soulPatchCollider.refreshBody()
  }
}

export class SoulPatchMesh extends Phaser.GameObjects.Mesh {
  debug: Phaser.GameObjects.Graphics

  constructor(scene, x, y) {
    super(scene, x, y, 'black')
    scene.add.existing(this)
    this.hideCCW = false
    this.setOrtho(this.width, this.height)
  }

  coordTransform(pt: NormalizedLandmark) {
    // MESH COORDINATES:
    // UPPER LEFT- -640, 360,
    // MIDDLE- 0, 0
    // BOT RIGHT- 640, -360

    // MEDIAPIPE COORDINATES:
    // UPPER LEFT- 0.0, 0.0,
    // MIDDLE- 0.5, 0.5,
    // BOT RIGHT- 1.0, 1.0

    // X: MP.x * this.width - this.width/2
    //    (MP.x - 0.5) * this.width

    // Y: -MP.y * this.height - this.hight/2
    //    (-MP.y - 0.5) * this.height
    return [(pt.x - 0.5) * this.width, (-pt.y + 0.5) * this.height]
  }

  updatePosition(soulPatchPoints: NormalizedLandmark[]) {
    const vertices = [
      ...this.coordTransform(soulPatchPoints[0]),
      ...this.coordTransform(soulPatchPoints[1]),
      ...this.coordTransform(soulPatchPoints[2]),
      ...this.coordTransform(soulPatchPoints[3])
    ]

    const uvs = [0, 0, 1, 0, 0, 1, 1, 1]
    const indices = [0, 2, 1, 2, 3, 1]
    this.clear()
    this.addVertices(vertices, uvs, indices)
  }
}
