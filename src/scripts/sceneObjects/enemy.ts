import { GameObjects, Math, Physics } from "phaser";
import { EnemyConfig } from "../lib/types/enemy";
import IEnemy from "../lib/interfaces/IEnemy";
import MainScene from "../scenes/mainScene";

export default class Enemy extends Physics.Arcade.Sprite implements IEnemy {
    protected targetPosition?: Math.Vector2;
    protected _accel: any;
    protected _shielded = false;

    protected config: EnemyConfig= {
        maxSpeed: 1000,
    }

    constructor(scene: Phaser.Scene, x: number, y: number ) {
        super(scene, x, y, 'moon-snail');
        scene.physics.add.existing(this);
        this.setSize(96, 96);
        this.setDisplaySize(64, 64);
        this.setBounce(3, 3);
        console.log('Construct Sprite', this);
    }

    reset() {
        this.setVelocity(0.0, 0.0);
        this._shielded = false;
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
        if((this.x < -100 || this.x > 1390) || (this.y < -250 || this.y > 830)) {
            this.setActive(false);
            this.setVisible(false);
            this.setInteractive(false);
            return;
        }

        if (this._shielded) {
            return;
        }

        if((this.scene as MainScene).player.shieldUp) {
            const shieldRadius = (this.scene as MainScene).player.targetShield.displayWidth/2.0;
            const radius = this.displayWidth / 2.0;
            const dist = Phaser.Math.Distance.Between(
                (this.scene as MainScene).player.foreheadTarget.x,
                (this.scene as MainScene).player.foreheadTarget.y,
                this.x,
                this.y
            );
            if (dist < shieldRadius + radius) {
                this.setVelocityX(-5.0*this.body.velocity.x);
                this.setVelocityY(-5.0*this.body.velocity.y);
                this.setAcceleration(0.0, 0.0);
                this._shielded = true;
                (this.scene as MainScene).player.shieldHit();
            }
        } else {
            const targetRadius =
            (this.scene as MainScene).player.foreheadTarget.displayWidth / 2.0;
            const radius = this.displayWidth / 2.0;
            const dist = Phaser.Math.Distance.Between(
                (this.scene as MainScene).player.foreheadTarget.x,
                (this.scene as MainScene).player.foreheadTarget.y,
                this.x,
                this.y
            );

            if (dist < targetRadius + radius) {
                this.active = false;
                // Move the sprite WAY off screen so that momentum
                // doesnt carry it past the target.  Thanks to
                // Dendenguy for this working perfectly idea!
                this.setX(-1000);
                this.setY(-1000);
                (this.scene as MainScene).player.addHit(this);
                return;
            }
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
