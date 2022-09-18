import { GameObjects, Math } from "phaser";
import { EnemyConfig } from "../lib/types/enemy";

import IEnemy from "../lib/interfaces/IEnemy";

export default class Enemy extends GameObjects.Sprite implements IEnemy {
    protected targetPosition?: Math.Vector2;
    protected acceleration: number;

    protected config: EnemyConfig= {
        maxSpeed: 200,
    }

    setTarget(target: GameObjects.GameObject) {
        if (target.body?.position) {
            this.targetPosition = new Math.Vector2(
                target.body.position.x,
                target.body.position.y
            );
        }
    }

    setAcceleration(accel: number) {
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