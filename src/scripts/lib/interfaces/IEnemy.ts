import { GameObjects } from "phaser";

export default interface IEnemy extends Phaser.GameObjects.GameObject {
    setTarget(target: GameObjects.GameObject);
    setAcceleration(accel: number);
}