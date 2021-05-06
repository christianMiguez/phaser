import { Game } from './game.js';

const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 630,
    scene: [Game],
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: { y: 500 },
            debug: true
        }
    }

};

var game = new Phaser.Game(config);