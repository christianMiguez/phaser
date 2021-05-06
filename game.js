import { Scoreboard } from './components/Scoreboard.js';

export class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'game' });
    }

    init() {
        this.scoreboard = new Scoreboard(this)
    }

    preload() {
        this.load.image('background', 'images/background.png');
        this.load.image('gameover', 'images/gameover.png');
        this.load.image('platform', 'images/platform.png');
        this.load.image('ball', 'images/ball.png');
    }

    create() {
        this.physics.world.setBoundsCollision(true, true, true, false);

        this.add.image(450, 315, 'background');
        this.gamoverimage = this.add.image(400, 200, 'gameover');
        this.gamoverimage.visible = false;

        this.scoreboard.create();

        this.platform = this.physics.add.image(450, 530, 'platform').setImmovable();
        this.platform.body.allowGravity = false;

        this.ball = this.physics.add.image(450, 90, 'ball');
        this.ball.setCollideWorldBounds(true);
        
        let velocity = 200 * Phaser.Math.Between(1.3, 2);

        if ( Phaser.Math.Between(0, 10) > 5 ) {
            velocity = 0 - velocity;
        }

        this.ball.setVelocity(velocity, 10);

        this.physics.add.collider(this.ball, this.platform, this.platformImpact, null, this);

        this.ball.setBounce(1);

        this.cursors = this.input.keyboard.createCursorKeys();

    }

    platformImpact() {
        this.ball.setVelocityY(-680)
        this.scoreboard.incrementPoints(1);
    }

    update() {
        if ( this.cursors.left.isDown) {
            this.platform.setVelocityX(-1400);
        }
        else if ( this.cursors.right.isDown) {
            this.platform.setVelocityX(1400);
        }
        else {
            this.platform.setVelocityX(0);
        }

        if (this.ball.y > 500) {
            console.log('fin');
            this.gamoverimage.visible = true;
            this.scene.pause();
        }
    }
}