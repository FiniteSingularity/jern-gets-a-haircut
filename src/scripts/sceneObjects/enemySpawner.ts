import { Math } from "phaser";
import type { EnemyFactory, EnemySpawnerConfig } from "../lib/types/enemy";
import IEnemy from "../lib/interfaces/IEnemy";


/**
 * This is a game object because it will require the scene anyhow
 */
export default class EnemySpawner<EnemyType extends IEnemy> extends Phaser.GameObjects.GameObject {


    /**
     * @todo allow for passed in config
     */
    protected config: EnemySpawnerConfig = {
        spawnMinX: 0,
        spawnMaxX: 0,
        spawnMinY: -64,
        spawnMaxY: 0,
        accellMin: 50,
        accellMax: 100
    };

    protected target: Phaser.GameObjects.GameObject;
    protected pool: Phaser.GameObjects.Group;

    constructor (
        protected readonly enemyFactory: EnemyFactory<EnemyType>,
        scene: Phaser.Scene
    ) {
        super(scene, "EnemySpawner");

        this.pool = this.scene.add.group([], {
            active: false,
            classType: enemyFactory
        });
    }

    init() {
        // pre-fill our pool
        this.config.spawnMaxX = this.scene.cameras.main.getBounds().right;
        this.pool.createMultiple({repeat: this.pool.maxSize});
    }

    // @todo setter instead?
    setTarget(target: Phaser.GameObjects.GameObject) {
        this.target = target;
    }

    spawnEnemy(): EnemyType | null {
        const spawnPosition = this.getNextSpawnPosition();
        const enemy = this.pool.getFirstDead(true, spawnPosition.x, spawnPosition.y);

        if (enemy === null) { 
            return null;
        }

        this.setTargetAndMotion(enemy);

        return enemy;
    }

    protected getNextSpawnPosition(): Math.Vector2 {
        // @todo make this better, and/or inject strategies for it so that they can spawn in patterns

        return new Math.Vector2(
            Math.Between(this.config.spawnMinX, this.config.spawnMaxX),
            Math.Between(this.config.spawnMinY, this.config.spawnMaxY)
        );
    }


    protected setTargetAndMotion(enemy: EnemyType) : void {
        enemy.setTarget(this.target);
        enemy.setAcceleration(Math.Between(this.config.accellMin, this.config.accellMax));
    }
}