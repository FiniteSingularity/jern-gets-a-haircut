import { GameObjects, Math, Physics } from "phaser";
import { EnemyConfig } from "../lib/types/enemy";
import IEnemy from "../lib/interfaces/IEnemy";

export default class Enemy extends Physics.Arcade.Sprite implements IEnemy {
    protected targetPosition?: Math.Vector2;
    protected _accel: any;
    

    protected config: EnemyConfig= {
        maxSpeed: 1000,
    }

    constructor(scene: Phaser.Scene, x: number, y: number ) {
        super(scene, x, y, 'phaser-logo');
        scene.physics.add.existing(this);
        this.setSize(96, 96);
        this.setDisplaySize(64, 64);
        this.setBounce(3, 3);
        
    }

    reset() {
        this.setVelocity(0.0, 0.0)
    }

    setTarget(target: GameObjects.Components.Transform) {
        if (target) {
            const angle = Phaser.Math.Angle.Between(this.x, this.y, target.x, target.y );
            const delta = Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y);
            const dist = 2000;

            this.targetPosition = new Math.Vector2(
                dist * (target.x - this.x)/delta + this.x,
                dist * (target.y - this.y)/delta + this.y
            );

        }
    }

    setAcceleration(x: number, y?: number | undefined) {
        const result = super.setAcceleration(x, y);
        this._accel =  (this.body as Physics.Arcade.Body).acceleration.length();
        return result;
    }

    update() {

        if (!this.targetPosition) {
            return;
        }

        if((this.x < -100 || this.x > 1390) || (this.y > 830)) {
            this.active = false;
            return
        }        

        this.scene.physics.accelerateTo(
          this,
          this.targetPosition.x,
          this.targetPosition.y,
          this._accel,
          this.config.maxSpeed,
          this.config.maxSpeed
        );
    }
}
