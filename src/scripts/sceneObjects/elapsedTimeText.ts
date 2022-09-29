import { Subscription } from 'rxjs';
import scoreService from '../lib/services/scoreService';
import { secondsToElapsedTime } from '../lib/utils';
export default class ElapsedTimeText extends Phaser.GameObjects.Text {
  scoreService = scoreService;
  subs = new Subscription();
  constructor(scene) {
    super(scene, 1000, 60, '', { color: 'black', fontSize: '28px' });
    scene.add.existing(this);
    this.setOrigin(0);
    this.subs.add(
      this.scoreService.score$.subscribe(score => {
        this.setText('Time: ' + secondsToElapsedTime(score.secondsElapsed));
      })
    );
  }

  public update() {}
}
