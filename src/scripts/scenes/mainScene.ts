import FpsText from '../sceneObjects/fpsText';
import EnemySpawner from '../sceneObjects/enemySpawner';
import Enemy from '../sceneObjects/enemy';
import Player from '../player/player';
import PhaserLogo from '../sceneObjects/phaserLogo';
import HitsText from '../sceneObjects/hitsText';
import scoreService, { Score } from '../lib/services/scoreService';
import ElapsedTimeText from '../sceneObjects/elapsedTimeText';
import { Subscription } from 'rxjs';
import { secondsToElapsedTime } from '../lib/utils';


const MAXHITS = 5;
export default class MainScene extends Phaser.Scene {
  private startSceneElement: HTMLDivElement;
  private gameOverElement: HTMLDivElement;
  private dodgeTimeElement: HTMLSpanElement;

  fpsText;
  hitsText;
  elapsedTimeText;
  player: Player;
  logo: PhaserLogo;

  subs = new Subscription();

  private enemySpawner!: EnemySpawner<Enemy>;
  private lastSpawnTime: number = 0;
  private lastSpawnChangetime: number = 0;
  private spawnInterval: number = 1500;
  private minInterval: number = 400;
  private spawnIntervalStep = 100;
  private spawnChangeTime: number = 10000;
  private scoreService = scoreService;
  private ended = false;

  constructor() {
    super({ key: 'MainScene' });
    this.startSceneElement = document.getElementById('start-screen') as HTMLDivElement;
    this.gameOverElement = document.getElementById('game-over') as HTMLDivElement;
    this.dodgeTimeElement = document.getElementById('dodge-time') as HTMLSpanElement;
    this.subs.add(this.scoreService.score$.subscribe(score => {
      if(score.hits >= MAXHITS) {
        this.endGame(score);
      }
    }))
  }

  create() {
    this.startSceneElement.classList.add('hide');
    // @todo inject me
    this.enemySpawner = new EnemySpawner(Enemy.prototype, this);

    this.player = new Player(this);

    this.fpsText = new FpsText(this);
    this.hitsText = new HitsText(this);
    this.elapsedTimeText = new ElapsedTimeText(this);

    const foreheadTarget = this.player.foreheadTarget;

    this.enemySpawner.setTarget(foreheadTarget);
    this.add.existing(this.enemySpawner);
    this.scoreService.resetScore();
    this.enemySpawner.init(foreheadTarget);
  }

  endGame(score: Score) {
    if(this.ended) {
      return;
    }
    console.log('endGame called!');
    this.scene.pause();
    this.player.freeze();

    const elapsedTime = secondsToElapsedTime(score.secondsElapsed);
    this.dodgeTimeElement.innerText = elapsedTime;
    // The below is yucky... WHY?
    const outcomes = Array.from(document.querySelectorAll('.outcome.hide'));
    const selected = outcomes[Phaser.Math.Between(0, outcomes.length - 1)];
    selected.classList.remove('hide');
    this.gameOverElement.classList.remove('hide');
    this.ended = true;
  }

  update(time: number, delta: number) {
    this.fpsText.update();
    this.player.update();
    this.scoreService.incrementSecondsElapsed(delta);
    if(this.lastSpawnTime === 0) {
      this.lastSpawnTime = time + this.spawnInterval;
    }
    if(this.lastSpawnChangetime < time) {
      this.spawnInterval = Math.max(this.minInterval, this.spawnInterval - this.spawnIntervalStep);
      this.lastSpawnChangetime = time + this.spawnChangeTime;
    }

    if (this.lastSpawnTime < time) {
      this.enemySpawner.spawnEnemy();
      this.lastSpawnTime = time + this.spawnInterval;
    }

    // this.enemySpawner.update();
  }

  preload() {
    this.load.image('black', 'assets/textures/black.png');
  }
}
