export type EnemyFactory<EnemyType> = (scene: Phaser.Scene) => EnemyType;

export type EnemySpawnerConfig = {
    spawnMinX: number;
    spawnMaxX: number;
    spawnMinY: number;
    spawnMaxY: number;
    accellMin: number;
    accellMax: number;
};

export type EnemyConfig = {
    maxSpeed: number;
}