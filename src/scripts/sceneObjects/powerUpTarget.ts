import MainScene from "../scenes/mainScene";

export default class PowerUpTarget extends Phaser.GameObjects.Ellipse {
  constructor(scene, x, y) {
    super(scene, x, y, 75, 75, 0xff0000, 0.5);
    scene.add.existing(this);
    //scene.physics.add.existing(this)
  }

  update() {
    if(this.active) {
      const player = (this.scene as MainScene).player;
      const targetRadius =
        player.foreheadTarget.displayWidth / 2.0;
        const radius = this.displayWidth / 2.0;
        const dist = Phaser.Math.Distance.Between(
            player.foreheadTarget.x,
            player.foreheadTarget.y,
            this.x,
            this.y
        );

        if (dist < targetRadius + radius) {
          player.shieldOn();
          this.setVisible(false);
        }
    }
  }
}
