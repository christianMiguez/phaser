
export class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'game' });
    }

    preload() {
        this.preload.image('background', 'images/background.png')
        this.preload.image('gameover', 'images/gameover.png')
        this.preload.image('platform', 'images/platform.png')
    }

    create() {
        this.add.image(400, 250, 'background', 'images/background.png');
        this.gamoverimage = this.add.image(400, 90, 'gameover');
        this.gamoverimage.visible = false;

        this.platform = this.physics.add.image(400, 460, 'platform');
        this.platform.body.allowGravity = false;

        this.cursors = this.input.keyboard.createCursorKeys();

        this.platform.setVelocity(100, 10);
    }
}

