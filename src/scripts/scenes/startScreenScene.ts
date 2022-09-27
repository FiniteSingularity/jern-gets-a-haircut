import { FaceTracker } from "../faceTracking/faceTracker";

export default class StartScreenScene extends Phaser.Scene {
  faceTracker: FaceTracker;
  startButton!: HTMLButtonElement;
  startScreen: HTMLDivElement;

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
  }

  create() {
    this.startScreen.classList.remove('hide');
  }

  startGame() {
    this.scene.start('MainScene');
  }
}
