import FpsText from '../sceneObjects/fpsText';
import EnemySpawner from '../sceneObjects/enemySpawner';
import Enemy from '../sceneObjects/enemy';
import Player from '../player/player';
import PhaserLogo from '../sceneObjects/phaserLogo';

export default class MainScene extends Phaser.Scene {
  fpsText;
  player: Player;
  logo: PhaserLogo;

  private enemySpawner!: EnemySpawner<Enemy>;
  private lastSpawnTime: number = 0;
  private spawnInterval: number = 1000;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    // @todo inject me
    this.enemySpawner = new EnemySpawner(Enemy.prototype, this);

    this.logo = new PhaserLogo(this, this.cameras.main.width / 2, 0);

    this.player = new Player(this);
    this.player.beard.addPhysicsCollsion(this.logo);

    this.fpsText = new FpsText(this);

    const soulPatch = this.player.beard.soulPatch.target;

    this.enemySpawner.setTarget(soulPatch);
    this.add.existing(this.enemySpawner);
    this.enemySpawner.init();

    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: '24px',
      })
      .setOrigin(1, 0);
  }

  update(time: number, delta: number) {
    this.fpsText.update();
    this.player.update();

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
