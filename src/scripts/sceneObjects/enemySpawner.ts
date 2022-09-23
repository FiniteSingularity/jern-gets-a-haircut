import { Math } from "phaser";
import type { EnemyFactory, EnemySpawnerConfig } from "../lib/types/enemy";
import IEnemy from "../lib/interfaces/IEnemy";
import Enemy from "./enemy";


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
        spawnMinY: 0,
        spawnMaxY: 640,
        accellMin: 50,
        accellMax: 600
    };

    protected target: Phaser.GameObjects.Components.Transform;
    protected pool: Phaser.GameObjects.Group;

    constructor (
        protected readonly enemyClass: EnemyType,
        scene: Phaser.Scene
    ) {
        super(scene, "EnemySpawner");

        this.pool = this.scene.add.group([], {
            // active: false,
            
            classType: enemyClass.constructor,
            runChildUpdate: true,
            max: 30,
            maxSize: 30
        });

    }

    init() {
        // pre-fill our pool
        this.config.spawnMaxX = this.scene.cameras.main.getBounds().right;
        for (let i = 0; i < this.pool.maxSize; i++) {
            const newEnemy = this.pool.create(
                undefined,
                undefined,
                undefined,
                undefined,
                undefined, false);
            this.scene.physics.add.collider(
                newEnemy,
                this.pool.getChildren(),
                (a, b) => { console.log('COLLISION'); }
            );
        }
    }

    // @todo setter instead?
    setTarget(target: Phaser.GameObjects.Components.Transform) {
        this.target = target;
    }

    spawnEnemy(): EnemyType | null {
        const spawnPosition = this.getNextSpawnPosition();
        const enemy = this.pool.getFirstDead(false, spawnPosition.x, spawnPosition.y);

        if (enemy === null) {
            return null;
        }
        enemy.reset()
        enemy.setX(spawnPosition.x);
        enemy.setY(spawnPosition.y);
        
        this.setTargetAndMotion(enemy);

        enemy.active = true;

        return enemy;
    }

    update(): void {
        this.pool.children.iterate((child) => child.update());
    }

    protected getNextSpawnPosition(): Math.Vector2 {
        // @todo make this better, and/or inject strategies for it so that they can spawn in patterns
        const axis = Math.Between(-1, 1)
        // const y = Math.Between(0, 720/2) * axis;
        // const x = Math.Between(0, 1280) 
        const x = axis === 0 ? Math.Between(0, 1280) :
                  axis === -1 ? 0 :
                  1280;
        const y = axis * Math.Between(0, 720 / 2);

        return new Math.Vector2(x,y);
    }


    protected setTargetAndMotion(enemy: EnemyType) : void {
        enemy.setTarget(this.target);
        enemy.setAcceleration(Math.Between(this.config.accellMin, this.config.accellMax));
    }
}
