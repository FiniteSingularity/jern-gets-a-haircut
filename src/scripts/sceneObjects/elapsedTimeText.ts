import { Subscription } from 'rxjs';
import scoreService from '../lib/services/scoreService';

export default class ElapsedTimeText extends Phaser.GameObjects.Text {
  scoreService = scoreService;
  subs = new Subscription();
  constructor(scene) {
    super(scene, 1000, 60, '', { color: 'black', fontSize: '28px' });
    scene.add.existing(this);
    this.setOrigin(0);
    this.subs.add(
      this.scoreService.score$.subscribe(score => {
        const secondsElapsed = Math.floor(score.secondsElapsed/10);
        const minutes = Math.floor(secondsElapsed/6000);
        const remaining = secondsElapsed % 6000;
        const seconds = Math.floor(remaining/100);
        const hundredths = remaining % 100;
        this.setText(`Time: ${minutes}:${seconds.toString().padStart(2,"0")}.${hundredths.toString().padStart(2,"0")}`);
      })
    );
  }

  public update() {}
}
