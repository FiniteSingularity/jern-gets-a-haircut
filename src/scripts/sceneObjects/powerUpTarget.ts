import MainScene from "../scenes/mainScene";

export default class PowerUpTarget extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'shield');
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
