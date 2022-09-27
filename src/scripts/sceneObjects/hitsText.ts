import { Subscription } from "rxjs";
import scoreService from "../lib/services/scoreService";

export default class HitsText extends Phaser.GameObjects.Text {
  scoreService = scoreService;
  subs = new Subscription();
  constructor(scene) {
    super(scene, 1000, 35, '', { color: 'black', fontSize: '28px' });
    scene.add.existing(this);
    this.setOrigin(0);
    this.subs.add(this.scoreService.score$.subscribe((score) => {
      this.setText(`Hits: ${score.hits}`);
    }));
  }

  public update() {}
}
