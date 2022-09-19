import { NormalizedLandmark } from '@mediapipe/face_mesh'

export default class SoulPatch extends Phaser.GameObjects.Mesh {
  constructor(scene, x, y) {
    super(scene, x, y, 'black')
    scene.add.existing(this)
    const vertices = [-1, 1, 0, 1, 0, -1, 1, 1]

    const uvs = [0, 0, 1, 0, 0, 1, 1, 1]

    const indices = [0, 2, 1, 2, 3, 1]

    this.addVertices(vertices, uvs, indices)
    this.panZ(4.8)
    console.log(this.vertices)
  }

  updatePosition(soulPatchPoints: NormalizedLandmark[]) {
    if (soulPatchPoints.length === 0) {
      return
    }
    this.clear()
    const vertices = [
      soulPatchPoints[0].x,
      soulPatchPoints[0].y,
      soulPatchPoints[1].x,
      soulPatchPoints[1].y,
      soulPatchPoints[2].x,
      soulPatchPoints[2].y,
      soulPatchPoints[3].x,
      soulPatchPoints[3].y
    ]
    const uvs = [0, 0, 1, 0, 0, 1, 1, 1]
    const indices = [0, 2, 1, 2, 3, 1]
    this.addVertices(vertices, uvs, indices)
    this.panZ(4.8)
    console.log(this.vertices)
    //console.log(this.vertices)
  }
}
