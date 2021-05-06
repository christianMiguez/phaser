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

        this.ball = this.physics.add.image(450, 490, 'ball');
        this.ball.setData('glue', true);
        this.ball.setCollideWorldBounds(true);

        this.physics.add.collider(this.ball, this.platform, this.platformImpact, null, this);

        this.ball.setBounce(1);

        this.cursors = this.input.keyboard.createCursorKeys();

    }

    platformImpact(ball, platform) {
        this.scoreboard.incrementPoints(1);

        let relativeImpact = ball.x - platform.x;
        console.log(relativeImpact);
        if(relativeImpact < 0.1 && relativeImpact > -0.1) {
            ball.setVelocityX(Phaser.Math.Between(-10, 10))
        } else {
            ball.setVelocityX(2 * relativeImpact)
        }
        
    }

    update() {
        if ( this.cursors.left.isDown) {
            this.platform.setVelocityX(-500);
            if (this.ball.getData('glue')) {
                this.ball.setVelocityX(-500);
            }
        }
        else if ( this.cursors.right.isDown) {
            this.platform.setVelocityX(500);
            if (this.ball.getData('glue')) {
                this.ball.setVelocityX(500);
            }
        }
        else {
            this.platform.setVelocityX(0);
            if (this.ball.getData('glue')) {
                this.ball.setVelocityX(0);
            }
            
        }

        if (this.ball.y > 500) {
            this.gamoverimage.visible = true;
            this.scene.pause();
        }

        if (this.cursors.up.isDown) {
            if (this.ball.getData('glue')) {
                this.ball.setVelocity(-75, 500);
            }
            
            this.ball.setData('glue', false)
        }
    }
}