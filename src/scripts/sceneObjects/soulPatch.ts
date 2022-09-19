import { NormalizedLandmark } from '@mediapipe/face_mesh'

export default class SoulPatch extends Phaser.GameObjects.Mesh {
  debug: Phaser.GameObjects.Graphics

  constructor(scene, x, y) {
    super(scene, x, y, 'black')
    scene.add.existing(this)
    const vertices = [-0.5, 0.5, 0, 0.5, 0, -0.5, 0.5, 0.5]

    const uvs = [0, 0, 1, 0, 0, 1, 1, 1]

    const indices = [0, 2, 1, 2, 3, 1]

    this.addVertices(vertices, uvs, indices)
    this.panZ(4.8)

    this.debug = this.scene.add.graphics()
    this.setDebug(this.debug)

    console.log(this.vertices)
  }

  updatePosition(soulPatchPoints: NormalizedLandmark[]) {
    this.debug.clear()
    this.debug.lineStyle(1, 0x00ff00)

    const vertices = [-0.5, 0.5, 0, 0.5, 0, -0.5, 0.5, 0.5]
    const uvs = [0, 0, 1, 0, 0, 1, 1, 1]
    const indices = [0, 2, 1, 2, 3, 1]
    // for (let i = 0; i < vertices.length / 2; i++) {
    //   let cVertex = this.vertices[i]
    //   cVertex.x = vertices[i * 2]
    //   cVertex.y = vertices[i * 2 + 1]
    // }
    this.clear()
    this.addVertices(vertices, uvs, indices)
    this.panZ(4.8)
  }

  // preUpdate() {
  //   // if (soulPatchPoints.length === 0) {
  //   //   return
  //   // }
  //   //this.clear()
  //   // const vertices = [
  //   //   soulPatchPoints[0].x,
  //   //   soulPatchPoints[0].y,
  //   //   soulPatchPoints[1].x,
  //   //   soulPatchPoints[1].y,
  //   //   soulPatchPoints[2].x,
  //   //   soulPatchPoints[2].y,
  //   //   soulPatchPoints[3].x,
  //   //   soulPatchPoints[3].y
  //   // ]
  //   // const vertices = [-0.5, 0.5, 0, 0.5, 0, -0.5, 0.5, 0.5]
  //   // const uvs = [0, 0, 1, 0, 0, 1, 1, 1]
  //   // const indices = [0, 2, 1, 2, 3, 1]
  //   // for (let i = 0; i < vertices.length / 2; i++) {
  //   //   let cVertex = this.vertices[i]
  //   //   cVertex.x = vertices[i * 2]
  //   //   cVertex.y = vertices[i * 2 + 1]
  //   // }
  //   // let i = 0
  //   // for (let vertex of this.vertices) {
  //   //   vertex.x = vertices[i * 2]
  //   //   vertex.y = vertices[i * 2 + 1]
  //   //   i++
  //   // }
  // }
}
