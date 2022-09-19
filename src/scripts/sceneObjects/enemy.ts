import { GameObjects, Math, Scene } from "phaser";
import { EnemyConfig, EnemyFactory } from "../lib/types/enemy";

import IEnemy from "../lib/interfaces/IEnemy";

export default class Enemy extends GameObjects.Sprite implements IEnemy {
    protected targetPosition?: Math.Vector2;
    protected acceleration: number;

    protected config: EnemyConfig= {
        maxSpeed: 200,
    }

    constructor(scene: Phaser.Scene, x: number, y: number ) {
        super(scene, x, y, 'phaser-logo');
        scene.physics.add.existing(this);
        this.setSize(32, 32);
        this.setDisplaySize(32, 32);
        
    }

    setTarget(target: GameObjects.Components.Transform) {
        if (target) {
            this.targetPosition = new Math.Vector2(
                target.x,
                target.y
            );

            console.log("set target to: ", this.targetPosition);
        }
    }

    setAcceleration(accel: number) {
        console.log("Set acceleration to:", accel);
        this.acceleration = accel;
    }

    update() {

        if (!this.targetPosition) {
            return;
        }

        this.scene.physics.accelerateTo(
            this,
            this.targetPosition.x,
            this.targetPosition.y,
            this.acceleration,
            this.config.maxSpeed,
            this.config.maxSpeed
        )
    }
}
