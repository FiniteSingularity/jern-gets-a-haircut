export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image('moon-snail', 'assets/img/snail.png');
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png');
    this.load.image('target', 'assets/img/target.png');
    this.load.image('rope-hair', 'assets/img/rope-hair-texture.png');
    this.load.image('shield','assets/img/shield.png');
    this.load.image('space-shield','assets/img/space-shield.png');
    this.load.audio('ricochet_01', ['assets/audio/ricochet_01.ogg']);
    this.load.audio('ricochet_02', ['assets/audio/ricochet_02.ogg']);
    this.load.audio('ricochet_03', ['assets/audio/ricochet_03.ogg']);
    this.load.audio('ricochet_04', ['assets/audio/ricochet_04.ogg']);
    this.load.audio('ricochet_05', ['assets/audio/ricochet_05.ogg']);

    this.load.audio('shield_bounce_01', ['assets/audio/shield_bounce_01.ogg']);
    this.load.audio('shield_bounce_02', ['assets/audio/shield_bounce_02.ogg']);
    this.load.audio('shield_bounce_03', ['assets/audio/shield_bounce_03.ogg']);
    this.load.audio('shield_bounce_04', ['assets/audio/shield_bounce_04.ogg']);
    this.load.audio('shield_bounce_05', ['assets/audio/shield_bounce_05.ogg']);

    this.load.audio('shield_charge', ['assets/audio/shield_charge.ogg']);

    this.load.audio('squish_1', ['assets/audio/squish1.mp3']);
    this.load.audio('squish_2', ['assets/audio/squish2.mp3']);
    this.load.audio('squish_3', ['assets/audio/squish3.mp3']);
    this.load.audio('squish_4', ['assets/audio/squish4.mp3']);
    this.load.audio('squish_5', ['assets/audio/squish5.mp3']);
    this.load.audio('squish_6', ['assets/audio/squish6.mp3']);
    this.load.audio('squish_7', ['assets/audio/squish7.mp3']);
    this.load.audio('squish_8', ['assets/audio/squish8.mp3']);
    this.load.audio('squish_9', ['assets/audio/squish9.mp3']);
    this.load.audio('squish_10', ['assets/audio/squish10.mp3']);
  }

  create() {
    this.scene.start('StartScreenScene');

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
