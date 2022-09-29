import { Subscription } from "rxjs";
import { FaceTracker } from "../faceTracking/faceTracker";

export default class StartScreenScene extends Phaser.Scene {
  faceTracker: FaceTracker;
  startButton!: HTMLButtonElement;
  startScreen: HTMLDivElement;
  subs = new Subscription();

  constructor() {
    super({ key: 'StartScreenScene' });
    this.faceTracker = FaceTracker.getInstance();
    this.faceTracker.setPreview();
    this.startButton = document.getElementById(
      'start-button'
    ) as HTMLButtonElement;
    this.startButton.addEventListener("click", (event: MouseEvent) => {
      this.startGame();
    });
    
    this.startScreen = document.getElementById('start-screen') as HTMLDivElement;
    this.subs.add(this.faceTracker.faceFeatures$.subscribe(faceFeatures => {
      const ele = document.getElementById('game-setup');
      if(faceFeatures.faceFound) {
        ele?.classList.add('hide');
      } else {
        ele?.classList.remove('hide');
      }
    }));
  }

  create() {
    this.startScreen.classList.remove('hide');
  }

  startGame() {
    this.subs.unsubscribe();
    this.scene.start('MainScene');
  }
}
