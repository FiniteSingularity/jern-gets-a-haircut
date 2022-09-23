import { GameObjects } from "phaser";

export default interface IEnemy extends Phaser.GameObjects.GameObject {
    setTarget(target: GameObjects.Components.Transform);
    setAcceleration(x: number, y?: number | undefined);

}
