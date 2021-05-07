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

        this.load.audio('derp', ['audio/derp.ogg']);
        this.load.audio('a', ['audio/a.ogg']);
        this.load.audio('b', ['audio/b.ogg']);
        this.load.audio('c', ['audio/c.ogg']);
        this.load.audio('vamos', ['audio/vamos.ogg']);
        this.load.audio('laplanta', ['audio/laplanta.ogg']);

        
        this.load.image('bloquea', 'images/bloquea.png');
        this.load.image('bloqueb', 'images/bloqueb.png');
        this.load.image('bloquec', 'images/bloquec.png');
        this.load.image('bloqued', 'images/bloqued.png'); //100x46
        this.load.image('congratulations', 'images/congratulations.png'); //100x46
    }

    create() {
        this.physics.world.setBoundsCollision(true, true, true, false);
        this.add.image(450, 315, 'background');

        // Grupo a lo pampa
        // this.miGrupo = this.physics.add.staticGroup();
        // this.miGrupo.create(254, 244, 'bloquea');
        // this.miGrupo.create(354, 244, 'bloqueb');
        // this.miGrupo.create(454, 244, 'bloquec');
        // this.miGrupo.create(554, 244, 'bloqued');

        this.derp = this.sound.add('derp')
        this.a = this.sound.add('a')
        this.b = this.sound.add('b')
        this.c = this.sound.add('c')
        this.vamos = this.sound.add('vamos')
        this.laplanta = this.sound.add('laplanta')

        this.bricks = this.physics.add.staticGroup({
            key: ['bloquea', 'bloqueb', 'bloquec', 'bloqued'],
            frameQuantity: 1,
            gridAlign: {
                width: 4,
                height: 1,
                cellWidth: 104,
                cellHeight: 50,
                x: 302,
                y: 100
            }
        })

        this.gamoverimage = this.add.image(400, 200, 'gameover');
        this.gamoverimage.visible = false;

        this.scoreboard.create();

        this.platform = this.physics.add.image(450, 560, 'platform').setImmovable();
        this.platform.body.allowGravity = false;

        this.ball = this.physics.add.image(450, 520, 'ball');
        this.ball.setData('glue', true);
        this.laplanta.volume = 0.5
        this.laplanta.play()

        this.ball.setCollideWorldBounds(true);

        this.congratulations = this.add.image(450, 200, 'congratulations');
        this.congratulations.visible = false;

        this.physics.add.collider(this.ball, this.platform, this.platformImpact, null, this);
        this.physics.add.collider(this.ball, this.bricks, this.brickImpact, null, this);

        this.ball.setBounce(1);

        this.cursors = this.input.keyboard.createCursorKeys();

    }

    brickImpact(ball, brick) {
        let random = Phaser.Math.Between(0, 2);

        if (this.bricks.countActive() !== 1) {
            if (random === 1) {
                this.a.play()
            } else if (random === 2) {
                this.c.play()
            } else {
                this.b.play()
            }
        } else {
            this.vamos.play()

        }
        

        this.scoreboard.incrementPoints(10);
        brick.disableBody(true, true);
        
        if (this.bricks.countActive() === 0) {
            this.congratulations.visible = true;
            this.scene.pause();

            
        }
    }

    platformImpact(ball, platform) {
        this.scoreboard.incrementPoints(1);

        let relativeImpact = ball.x - platform.x;
        console.log(relativeImpact);
        if(relativeImpact < 0.1 && relativeImpact > -0.1) {
            ball.setVelocityX(Phaser.Math.Between(-0, 10))
        } else {
            ball.setVelocityX(4 * relativeImpact);
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

        if (this.ball.y > 600) {
            this.gamoverimage.visible = true;
            this.bricks.visible = false;
            this.scene.load
            this.scene.restart();
            
            
        }

        if (this.cursors.up.isDown) {
            if (this.ball.getData('glue')) {
                this.ball.setVelocity(-75, 500);
            }
            
            this.ball.setData('glue', false)
        }
    }
}