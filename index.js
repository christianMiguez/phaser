import { Game } from './game.js';

const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 630,
    scene: [Game],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 220 },
            debug: false
        }
    }

};

var game = new Phaser.Game(config);