import { Subscription } from "rxjs";
import scoreService from "../lib/services/scoreService";

export default class HitsText extends Phaser.GameObjects.Text {
  scoreService = scoreService;
  subs = new Subscription();
  constructor(scene, maxHits) {
    super(scene, 882, 35, '', { color: 'black', fontSize: '28px' });
    scene.add.existing(this);
    this.setOrigin(0);
    this.subs.add(this.scoreService.score$.subscribe((score) => {
      this.setText(`Hair Growth: ${Math.floor(100.0 * score.hits/maxHits).toString()}%`);
    }));
  }

  public update() {}
}
