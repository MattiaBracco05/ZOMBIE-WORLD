//Commentare la riga qua sotto dopo aver verificato che ci sia l'alert e che quindi sia tutto collegato
//alert("Test di collegamento")

//----FUNZIONE PLAY----
const play = () => {
    window.open('./game.html');
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-container",
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload,
        create,
        update,
    }
};

var game = new Phaser.Game(config);
//oggetti
let cursors;
let player;
let AID = 0;
let SKULL = 0;
//variabili per punteggi
let lifeTot = 100;
let killTot = 0;
let scoreTot = 0;
//variabili per il timer
let timerEvent;
let initialTime = 0;
//vite dei nemici
let lifeEnemy_1 = 150;
let lifeEnemy_2 = 300;
let lifeEnemy_3 = 400;
let lifeEnemy_4 = 500;
//Contatore per spostamento "enemy_3" & "enemy_4"
let E3_count = 0;
let E4_count = 0;
//tasti per interattività
let key_A;
let key_E;
//debug disabilitato di default
let showDebug = false;

//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------

function preload() {
    //------------------------------------------------------------
    //-----------------------TILE MAP-----------------------------
    //------------------------------------------------------------
    this.load.image("tiles", "https://mikewesthad.github.io/phaser-3-tilemap-blog-posts/post-1/assets/tilesets/tuxmon-sample-32px-extruded.png");
    this.load.tilemapTiledJSON("map", "https://mikewesthad.github.io/phaser-3-tilemap-blog-posts/post-1/assets/tilemaps/tuxemon-town.json");
    //------------------------------------------------------------
    //------------------------SPRITE------------------------------
    //------------------------------------------------------------
    this.load.image("zombie", "./assets/zombie/fermo.png");
    this.load.image("enemy_1", "./assets/enemy_1/fermo.png");
    this.load.image("enemy_2", "./assets/enemy_2/fermo.png");
    this.load.image("enemy_3", "./assets/enemy_3/fermo.png");
    this.load.image("enemy_4", "./assets/enemy_4/fermo.png");
    this.load.image("mine", "./assets/mine.png");
    this.load.image("grenade", "./assets/grenade.png");
    this.load.image("first_AID", "./assets/first_AID.png");
    this.load.image("skull", "./assets/skull.png");
    this.load.image("close", "./assets/close.png");
    this.load.image("open", "./assets/open.png");
    //------------------------------------------------------------
    //-------------------ANIMAZIONI PLAYER------------------------
    //------------------------------------------------------------
    //IMG ANIMATION LEFT WALK
    this.load.image("walk_sx_1", "./assets/zombie/walk_sx_1.png");
    this.load.image("walk_sx_2", "./assets/zombie/walk_sx_2.png");
    this.load.image("walk_sx_3", "./assets/zombie/walk_sx_3.png");
    this.load.image("walk_sx_4", "./assets/zombie/walk_sx_4.png");
    this.load.image("walk_sx_5", "./assets/zombie/walk_sx_5.png");
    this.load.image("walk_sx_6", "./assets/zombie/walk_sx_6.png");
    //IMG ANIMATION RIGHT WALK
    this.load.image("walk_dx_1", "./assets/zombie/walk_dx_1.png");
    this.load.image("walk_dx_2", "./assets/zombie/walk_dx_2.png");
    this.load.image("walk_dx_3", "./assets/zombie/walk_dx_3.png");
    this.load.image("walk_dx_4", "./assets/zombie/walk_dx_4.png");
    this.load.image("walk_dx_5", "./assets/zombie/walk_dx_5.png");
    this.load.image("walk_dx_6", "./assets/zombie/walk_dx_6.png");
    //IMG ANIMATION UP WALK
    this.load.image("up_1", "./assets/zombie/jump_4.png");
    this.load.image("up_2", "./assets/zombie/jump_5.png");
    //IMG ANIMATION DOWN WALK
    this.load.image("down_1", "./assets/zombie/jump_1.png");
    this.load.image("down_2", "./assets/zombie/jump_2.png");
    //IMG ANIMATION ATTACK
    this.load.image("attack_1", "./assets/zombie/attack_1.png");
    this.load.image("attack_2", "./assets/zombie/attack_2.png");
    this.load.image("attack_3", "./assets/zombie/attack_3.png");
    this.load.image("attack_4", "./assets/zombie/attack_4.png");
    this.load.image("attack_5", "./assets/zombie/attack_5.png");
    this.load.image("attack_6", "./assets/zombie/attack_6.png");
    //IMG ANIMATION DEAD
    this.load.image("dead_1", "./assets/zombie/dead_1.png");
    this.load.image("dead_2", "./assets/zombie/dead_2.png");
    this.load.image("dead_3", "./assets/zombie/dead_3.png");
    this.load.image("dead_4", "./assets/zombie/dead_4.png");
    this.load.image("dead_5", "./assets/zombie/dead_5.png");
    this.load.image("dead_6", "./assets/zombie/dead_6.png");
    this.load.image("dead_7", "./assets/zombie/dead_7.png");
    this.load.image("dead_8", "./assets/zombie/dead_8.png");
    //------------------------------------------------------------
    //-------------------ANIMAZIONI ENEMY 1-----------------------
    //------------------------------------------------------------
    //IMG ANIMATION IDLE
    this.load.image("E1_idle_1", "./assets/enemy_1/idle_1.png");
    this.load.image("E1_idle_2", "./assets/enemy_1/idle_2.png");
    this.load.image("E1_idle_3", "./assets/enemy_1/idle_3.png");
    this.load.image("E1_idle_4", "./assets/enemy_1/idle_4.png");
    //IMG ANIMATION ATTACK
    this.load.image("E1_attack_1", "./assets/enemy_1/attack_1.png");
    this.load.image("E1_attack_2", "./assets/enemy_1/attack_2.png");
    this.load.image("E1_attack_3", "./assets/enemy_1/attack_3.png");
    this.load.image("E1_attack_4", "./assets/enemy_1/attack_4.png");
    this.load.image("E1_attack_5", "./assets/enemy_1/attack_5.png");
    this.load.image("E1_attack_6", "./assets/enemy_1/attack_6.png");
    //IMG ANIMATION DEAD
    this.load.image("E1_dead_1", "./assets/enemy_1/dead_1.png");
    this.load.image("E1_dead_2", "./assets/enemy_1/dead_2.png");
    this.load.image("E1_dead_3", "./assets/enemy_1/dead_3.png");
    this.load.image("E1_dead_4", "./assets/enemy_1/dead_4.png");
    this.load.image("E1_dead_5", "./assets/enemy_1/dead_5.png");
    this.load.image("E1_dead_6", "./assets/enemy_1/dead_6.png");
    this.load.image("E1_dead_7", "./assets/enemy_1/dead_7.png");
    this.load.image("E1_dead_8", "./assets/enemy_1/dead_8.png");
    //------------------------------------------------------------
    //-------------------ANIMAZIONI ENEMY 2-----------------------
    //------------------------------------------------------------
    //IMG ANIMATION IDLE
    this.load.image("E2_idle_1", "./assets/enemy_2/idle_1.png");
    this.load.image("E2_idle_2", "./assets/enemy_2/idle_2.png");
    this.load.image("E2_idle_3", "./assets/enemy_2/idle_3.png");
    this.load.image("E2_idle_4", "./assets/enemy_2/idle_4.png");
    //IMG ANIMATION ATTACK
    this.load.image("E2_attack_1", "./assets/enemy_2/attack_1.png");
    this.load.image("E2_attack_2", "./assets/enemy_2/attack_2.png");
    this.load.image("E2_attack_3", "./assets/enemy_2/attack_3.png");
    this.load.image("E2_attack_4", "./assets/enemy_2/attack_4.png");
    this.load.image("E2_attack_5", "./assets/enemy_2/attack_5.png");
    this.load.image("E2_attack_6", "./assets/enemy_2/attack_6.png");
    //IMG ANIMATION DEAD
    this.load.image("E2_dead_1", "./assets/enemy_2/dead_1.png");
    this.load.image("E2_dead_2", "./assets/enemy_2/dead_2.png");
    this.load.image("E2_dead_3", "./assets/enemy_2/dead_3.png");
    this.load.image("E2_dead_4", "./assets/enemy_2/dead_4.png");
    this.load.image("E2_dead_5", "./assets/enemy_2/dead_5.png");
    this.load.image("E2_dead_6", "./assets/enemy_2/dead_6.png");
    this.load.image("E2_dead_7", "./assets/enemy_2/dead_7.png");
    this.load.image("E2_dead_8", "./assets/enemy_2/dead_8.png");
    //------------------------------------------------------------
    //-------------------ANIMAZIONI ENEMY 3-----------------------
    //------------------------------------------------------------
    //IMG ANIMATION LEFT WALK
    this.load.image("E3_walk_sx_1", "./assets/enemy_3/walk_sx_1.png");
    this.load.image("E3_walk_sx_2", "./assets/enemy_3/walk_sx_2.png");
    this.load.image("E3_walk_sx_3", "./assets/enemy_3/walk_sx_3.png");
    this.load.image("E3_walk_sx_4", "./assets/enemy_3/walk_sx_4.png");
    this.load.image("E3_walk_sx_5", "./assets/enemy_3/walk_sx_5.png");
    this.load.image("E3_walk_sx_6", "./assets/enemy_3/walk_sx_6.png");
    //IMG ANIMATION RIGHT WALK
    this.load.image("E3_walk_dx_1", "./assets/enemy_3/walk_dx_1.png");
    this.load.image("E3_walk_dx_2", "./assets/enemy_3/walk_dx_2.png");
    this.load.image("E3_walk_dx_3", "./assets/enemy_3/walk_dx_3.png");
    this.load.image("E3_walk_dx_4", "./assets/enemy_3/walk_dx_4.png");
    this.load.image("E3_walk_dx_5", "./assets/enemy_3/walk_dx_5.png");
    this.load.image("E3_walk_dx_6", "./assets/enemy_3/walk_dx_6.png");
    //------------------------------------------------------------
    //-------------------ANIMAZIONI ENEMY 4-----------------------
    //------------------------------------------------------------
    //IMG ANIMATION LEFT RUN
    this.load.image("E4_run_sx_1", "./assets/enemy_4/run_sx_1.png");
    this.load.image("E4_run_sx_2", "./assets/enemy_4/run_sx_2.png");
    this.load.image("E4_run_sx_3", "./assets/enemy_4/run_sx_3.png");
    this.load.image("E4_run_sx_4", "./assets/enemy_4/run_sx_4.png");
    this.load.image("E4_run_sx_5", "./assets/enemy_4/run_sx_5.png");
    this.load.image("E4_run_sx_6", "./assets/enemy_4/run_sx_6.png");
    this.load.image("E4_run_sx_7", "./assets/enemy_4/run_sx_7.png");
    this.load.image("E4_run_sx_8", "./assets/enemy_4/run_sx_8.png");
    this.load.image("E4_run_sx_9", "./assets/enemy_4/run_sx_9.png");
    this.load.image("E4_run_sx_10", "./assets/enemy_4/run_sx_10.png");
    //IMG ANIMATION RIGHT RUN
    this.load.image("E4_run_dx_1", "./assets/enemy_4/run_dx_1.png");
    this.load.image("E4_run_dx_2", "./assets/enemy_4/run_dx_2.png");
    this.load.image("E4_run_dx_3", "./assets/enemy_4/run_dx_3.png");
    this.load.image("E4_run_dx_4", "./assets/enemy_4/run_dx_4.png");
    this.load.image("E4_run_dx_5", "./assets/enemy_4/run_dx_5.png");
    this.load.image("E4_run_dx_6", "./assets/enemy_4/run_dx_6.png");
    this.load.image("E4_run_dx_7", "./assets/enemy_4/run_dx_7.png");
    this.load.image("E4_run_dx_8", "./assets/enemy_4/run_dx_8.png");
    this.load.image("E4_run_dx_9", "./assets/enemy_4/run_dx_9.png");
    this.load.image("E4_run_dx_10", "./assets/enemy_4/run_dx_10.png");
    //------------------------------------------------------------
    //--------------------------SOUND-----------------------------
    //------------------------------------------------------------
    this.load.audio("game_over", "./assets/music/game_over.mp3");
    this.load.audio("game_win", "./assets/music/game_win.mp3");
    this.load.audio("open", "./assets/music/open.mp3");
    this.load.audio("boom", "./assets/music/boom.mp3");
    this.load.audio("collect_skull", "./assets/music/collect_skull.mp3");
}

//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------

function create() {
    //MAP
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");
    //MAP LEVELS
    const belowLayer = map.createLayer("Below Player", tileset, 0, 0);
    const worldLayer = map.createLayer("World", tileset, 0, 0);
    const aboveLayer = map.createLayer("Above Player", tileset, 0, 0);

    worldLayer.setCollisionByProperty({ collides: true });
    aboveLayer.setDepth(10);
    const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");

    console.log("(Player) Spawn Point X:" + spawnPoint.x);
    console.log("(Player) Spawn Point Y:" + spawnPoint.y);

    //SPRITE
    player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'zombie').setOffset(0, 24).setScale(0.2, 0.2);
    enemy_1 = this.physics.add.sprite(450, 920, 'enemy_1').setOffset(0, 24).setScale(0.2, 0.2);
    enemy_2 = this.physics.add.sprite(975, 1000, 'enemy_2').setOffset(0, 24).setScale(0.2, 0.2);
    enemy_3 = this.physics.add.sprite(650, 580, 'enemy_3').setOffset(0, 24).setScale(0.2, 0.2);
    enemy_4 = this.physics.add.sprite(150, 330, 'enemy_4').setOffset(0, 24).setScale(0.2, 0.2);
    mine = this.physics.add.sprite(130, 640, 'mine').setOffset(0, 24).setScale(0.2, 0.2);
    grenade = this.physics.add.sprite(750, 900, 'grenade').setOffset(0, 24).setScale(0.1, 0.1);
    first_AID = this.physics.add.sprite(880, 900, 'first_AID').setOffset(0, 24).setScale(0.1, 0.1);
    skull = this.physics.add.sprite(950, 470, 'skull').setOffset(0, 24).setScale(0.1, 0.1);
    basket = this.physics.add.sprite(750, 350, 'close').setOffset(0, 24).setScale(0.1, 0.1);

    //CHECK COLLISIONS
    this.physics.add.collider(player, worldLayer);
    this.physics.add.overlap(player, mine, hitMine, null, this);
    this.physics.add.overlap(player, grenade, hitGrenade, null, this);
    this.physics.add.overlap(player, basket, hitBasket, null, this);
    this.physics.add.overlap(player, first_AID, collectAID, null, this);
    this.physics.add.overlap(player, skull, collectSkull, null, this);
    this.physics.add.overlap(player, enemy_1, hitEnemy_1, null, this);
    this.physics.add.overlap(player, enemy_2, hitEnemy_2, null, this);
    this.physics.add.overlap(player, enemy_3, hitEnemy_3, null, this);
    this.physics.add.overlap(player, enemy_4, hitEnemy_4, null, this);

    //TEXT
    scoreText = this.add.text(700, 1080, 'Score: 0', { fontSize: '32px', fill: 'black' });
    timerText = this.add.text(900, 1120, 'Time: NO', { fontSize: '32px', fill: 'black' });
    timerEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });
    lifeText = this.add.text(900, 1080, 'Life: 100', { fontSize: '32px', fill: 'black' });
    killText = this.add.text(700, 1120, 'Kill: 0', { fontSize: '32px', fill: 'black' });
    titleText = this.add.text(100, 670, 'Il Pianeta Degli Zombie, Bracco Mattia 4C INFO', { fontSize: '25px', fill: 'yellow' });
    attackText = this.add.text(16, 16, 'Attack: -', { fontSize: '24px', fill: 'yellow' }).setScrollFactor(0).setDepth(30);
    gameOverText = this.add.text(300, 250, '', { fontSize: '48px', fill: 'red' }).setScrollFactor(0).setDepth(30);
    gameOverText2 = this.add.text(250, 450, '', { fontSize: '32px', fill: 'red' }).setScrollFactor(0).setDepth(30);
    gameWinText = this.add.text(300, 250, '', { fontSize: '48px', fill: 'yellow' }).setScrollFactor(0).setDepth(30);
    gameWinText2 = this.add.text(250, 450, '', { fontSize: '32px', fill: 'yellow' }).setScrollFactor(0).setDepth(30);
    //SOUND
    this.sound.add('boom');
    this.sound.add('open');
    this.sound.add('collect_skull');
    this.sound.add('game_over');
    this.sound.add('game_win');

    //ANIMAZIONI DELLO SPRITE
    const anims = this.anims;
    //------------------------------------------------------------
    //-------------------ANIMAZIONI PLAYER------------------------
    //------------------------------------------------------------
    //LEFT WALK
    anims.create({
        key: "left_walk",
        frames: [
            { key: 'walk_sx_1' },
            { key: 'walk_sx_2' },
            { key: 'walk_sx_3' },
            { key: 'walk_sx_4' },
            { key: 'walk_sx_5' },
            { key: 'walk_sx_6', duration: 50 }
        ],
        frameRate: 7,
        repeat: -1
    });
    //RIGHT WALK
    anims.create({
        key: "right_walk",
        frames: [
            { key: 'walk_dx_1' },
            { key: 'walk_dx_2' },
            { key: 'walk_dx_3' },
            { key: 'walk_dx_4' },
            { key: 'walk_dx_5' },
            { key: 'walk_dx_6', duration: 50 }
        ],
        frameRate: 7,
        repeat: -1
    });
    //UP WALK
    anims.create({
        key: "up_walk",
        frames: [
            { key: 'up_1' },
            { key: 'up_2', duration: 50 }
        ],
        frameRate: 3,
        repeat: -1
    });
    //DOWN WALK
    anims.create({
        key: "down_walk",
        frames: [
            { key: 'down_1' },
            { key: 'down_2', duration: 50 }
        ],
        frameRate: 3,
        repeat: -1
    });
    //ATTACK
    anims.create({
        key: "attack",
        frames: [
            { key: 'attack_1' },
            { key: 'attack_2' },
            { key: 'attack_3' },
            { key: 'attack_4' },
            { key: 'attack_5' },
            { key: 'attack_6', duration: 50 }
        ],
        frameRate: 7,
        repeat: -1
    });
    //DEAD
    anims.create({
        key: "dead",
        frames: [
            { key: 'dead_1' },
            { key: 'dead_2' },
            { key: 'dead_3' },
            { key: 'dead_4' },
            { key: 'dead_5' },
            { key: 'dead_6' },
            { key: 'dead_7' },
            { key: 'dead_8', duration: 50 }
        ],
        frameRate: 9,
    });
    //------------------------------------------------------------
    //-------------------ANIMAZIONI ENEMY 1-----------------------
    //------------------------------------------------------------
    //IDLE
    anims.create({
        key: "E1_idle",
        frames: [
            { key: 'E1_idle_1' },
            { key: 'E1_idle_2' },
            { key: 'E1_idle_3' },
            { key: 'E1_idle_4', duration: 50 }
        ],
        frameRate: 5,
        repeat: -1
    });
    //ATTACK
    anims.create({
        key: "E1_attack",
        frames: [
            { key: 'E1_attack_1' },
            { key: 'E1_attack_2' },
            { key: 'E1_attack_3' },
            { key: 'E1_attack_4' },
            { key: 'E1_attack_5' },
            { key: 'E1_attack_6', duration: 50 }
        ],
        frameRate: 7,
        repeat: -1
    });
    //DEAD
    anims.create({
        key: "E1_dead",
        frames: [
            { key: 'E1_dead_1' },
            { key: 'E1_dead_2' },
            { key: 'E1_dead_3' },
            { key: 'E1_dead_4' },
            { key: 'E1_dead_5' },
            { key: 'E1_dead_6' },
            { key: 'E1_dead_7' },
            { key: 'E1_dead_8', duration: 50 }
        ],
        frameRate: 9,
    });
    //------------------------------------------------------------
    //-------------------ANIMAZIONI ENEMY 2-----------------------
    //------------------------------------------------------------
    //IDLE
    anims.create({
        key: "E2_idle",
        frames: [
            { key: 'E2_idle_1' },
            { key: 'E2_idle_2' },
            { key: 'E2_idle_3' },
            { key: 'E2_idle_4', duration: 50 }
        ],
        frameRate: 5,
        repeat: -1
    });
    //ATTACK
    anims.create({
        key: "E2_attack",
        frames: [
            { key: 'E2_attack_1' },
            { key: 'E2_attack_2' },
            { key: 'E2_attack_3' },
            { key: 'E2_attack_4' },
            { key: 'E2_attack_5' },
            { key: 'E2_attack_6', duration: 50 }
        ],
        frameRate: 7,
        repeat: -1
    });
    //DEAD
    anims.create({
        key: "E2_dead",
        frames: [
            { key: 'E2_dead_1' },
            { key: 'E2_dead_2' },
            { key: 'E2_dead_3' },
            { key: 'E2_dead_4' },
            { key: 'E2_dead_5' },
            { key: 'E2_dead_6' },
            { key: 'E2_dead_7' },
            { key: 'E2_dead_8', duration: 50 }
        ],
        frameRate: 9,
    });
    //------------------------------------------------------------
    //-------------------ANIMAZIONI ENEMY 3-----------------------
    //------------------------------------------------------------
    //LEFT WALK
    anims.create({
        key: "E3_left_walk",
        frames: [
            { key: 'E3_walk_sx_1' },
            { key: 'E3_walk_sx_2' },
            { key: 'E3_walk_sx_3' },
            { key: 'E3_walk_sx_4' },
            { key: 'E3_walk_sx_5' },
            { key: 'E3_walk_sx_6', duration: 50 }
        ],
        frameRate: 7,
        repeat: -1
    });
    //RIGHT WALK
    anims.create({
        key: "E3_right_walk",
        frames: [
            { key: 'E3_walk_dx_1' },
            { key: 'E3_walk_dx_2' },
            { key: 'E3_walk_dx_3' },
            { key: 'E3_walk_dx_4' },
            { key: 'E3_walk_dx_5' },
            { key: 'E3_walk_dx_6', duration: 50 }
        ],
        frameRate: 7,
        repeat: -1
    });
    //ATTACK
    anims.create({
        key: "E3_attack",
        frames: [
            { key: 'E2_attack_1' },
            { key: 'E2_attack_2' },
            { key: 'E2_attack_3' },
            { key: 'E2_attack_4' },
            { key: 'E2_attack_5' },
            { key: 'E2_attack_6', duration: 50 }
        ],
        frameRate: 7,
        repeat: -1
    });
    //DEAD
    anims.create({
        key: "E3_dead",
        frames: [
            { key: 'E2_dead_1' },
            { key: 'E2_dead_2' },
            { key: 'E2_dead_3' },
            { key: 'E2_dead_4' },
            { key: 'E2_dead_5' },
            { key: 'E2_dead_6' },
            { key: 'E2_dead_7' },
            { key: 'E2_dead_8', duration: 50 }
        ],
        frameRate: 9,
    });
    //------------------------------------------------------------
    //-------------------ANIMAZIONI ENEMY 4-----------------------
    //------------------------------------------------------------
    //ATTACK
    anims.create({
        key: "E4_attack",
        frames: [
            { key: 'E2_attack_1' },
            { key: 'E2_attack_2' },
            { key: 'E2_attack_3' },
            { key: 'E2_attack_4' },
            { key: 'E2_attack_5' },
            { key: 'E2_attack_6', duration: 50 }
        ],
        frameRate: 7,
        repeat: -1
    });
    //DEAD
    anims.create({
        key: "E4_dead",
        frames: [
            { key: 'E2_dead_1' },
            { key: 'E2_dead_2' },
            { key: 'E2_dead_3' },
            { key: 'E2_dead_4' },
            { key: 'E2_dead_5' },
            { key: 'E2_dead_6' },
            { key: 'E2_dead_7' },
            { key: 'E2_dead_8', duration: 50 }
        ],
        frameRate: 9,
    });
    //LEFT RUN
    anims.create({
        key: "E4_left_run",
        frames: [
            { key: 'E4_run_sx_1' },
            { key: 'E4_run_sx_2' },
            { key: 'E4_run_sx_3' },
            { key: 'E4_run_sx_4' },
            { key: 'E4_run_sx_5' },
            { key: 'E4_run_sx_6' },
            { key: 'E4_run_sx_7' },
            { key: 'E4_run_sx_8' },
            { key: 'E4_run_sx_9' },
            { key: 'E4_run_sx_10', duration: 50 }
        ],
        frameRate: 11,
        repeat: -1
    });
    //RIGHT RUN
    anims.create({
        key: "E4_right_run",
        frames: [
            { key: 'E4_run_dx_1' },
            { key: 'E4_run_dx_2' },
            { key: 'E4_run_dx_3' },
            { key: 'E4_run_dx_4' },
            { key: 'E4_run_dx_5' },
            { key: 'E4_run_dx_6' },
            { key: 'E4_run_dx_7' },
            { key: 'E4_run_dx_8' },
            { key: 'E4_run_dx_9' },
            { key: 'E4_run_dx_10', duration: 50 }
        ],
        frameRate: 11,
        repeat: -1
    });
    //------------------------------------------------------------
    //-------------------ANIMAZIONI BAULE-------------------------
    //------------------------------------------------------------
    anims.create({
        key: "open",
        frames: [
            { key: 'open', duration: 50 },
        ],
        frameRate: 2,
    });

    //FOLLOW PLAYER
    const camera = this.cameras.main;
    camera.startFollow(player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    cursors = this.input.keyboard.createCursorKeys();

    //SHOW COLLISION BORDER --> key "D"
    this.input.keyboard.once("keydown-D", event => {
        this.physics.world.createDebugGraphic();
        const graphics = this.add.
        graphics().
        setAlpha(0.75).
        setDepth(20);
        worldLayer.renderDebug(graphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        });
    });
    //KEYBOARD
    key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    key_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
}

//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------

function update(time, delta) {
    const speed = 175;
    const prevVelocity = player.body.velocity.clone();
    player.body.setVelocity(0);
    enemy_1.anims.play("E1_idle", true);
    enemy_2.anims.play("E2_idle", true);

    //KEYBOARD
    if (key_E.isDown) {
        console.log('Premuto tasto "E"');
        checkAID();
    }

    //------------------------------------------------------------
    //-------------------SPOSTAMENTO PLAYER-----------------------
    //------------------------------------------------------------
    //LEFT & RIGHT
    if (cursors.left.isDown) {
        player.body.setVelocityX(-speed);
    } else if (cursors.right.isDown) {
        player.body.setVelocityX(speed);
    }
    //UP & DOWN
    if (cursors.up.isDown) {
        player.body.setVelocityY(-speed);
    } else if (cursors.down.isDown) {
        player.body.setVelocityY(speed);
    }
    //NORMALIZE SPEED
    player.body.velocity.normalize().scale(speed);
    //WALK ANIMATION
    if (lifeTot > 1) {
        if (cursors.left.isDown) {
            player.anims.play("left_walk", true);
        } else if (cursors.right.isDown) {
            player.anims.play("right_walk", true);
        } else if (cursors.up.isDown) {
            player.anims.play("up_walk", true);
        } else if (cursors.down.isDown) {
            player.anims.play("down_walk", true);
        } else if (cursors.space.isDown) {
            player.anims.play("attack", true);
        } else {
            player.anims.stop();
            if (prevVelocity.x < 0) player.setTexture("walk_sx_1");
            else if (prevVelocity.x > 0) player.setTexture("walk_dx_1");
            else if (prevVelocity.y < 0) player.setTexture("up_1");
            else if (prevVelocity.y > 0) player.setTexture("down_1");
        }
    }
    //------------------------------------------------------------
    //-------------------SPOSTAMENTO ENEMY 3----------------------
    //------------------------------------------------------------
    if (E3_count < 450) { //va avanti (DX)
        enemy_3.x += 1;
        E3_count++;
        //console.log("Count: " + E3_count);
        enemy_3.anims.play("E3_right_walk", true);
    }
    if (E3_count >= 450) { //tonra indietro (SX)
        enemy_3.x -= 1;
        E3_count++;
        //console.log("Count: " + E3_count);
        enemy_3.anims.play("E3_left_walk", true);
    }
    if (E3_count === 900) { //quando è tonrato al punto di partenza il contatore (count) torna a 0
        E3_count = 0;
        //console.log("Count azzerato");
    }
    //------------------------------------------------------------
    //-------------------SPOSTAMENTO ENEMY 4----------------------
    //------------------------------------------------------------
    if (E4_count < 200) { //va avanti (DX)
        enemy_4.x += 3;
        E4_count++;
        //console.log("Count: " + E4_count);
        enemy_4.anims.play("E4_right_run", true);
    }
    if (E4_count >= 200) { //tonra indietro (SX)
        enemy_4.x -= 3;
        E4_count++;
        //console.log("Count: " + E4_count);
        enemy_4.anims.play("E4_left_run", true);
    }
    if (E4_count === 400) { //quando è tonrato al punto di partenza il contatore (count) torna a 0
        E4_count = 0;
        //console.log("Count azzerato");
    }
}

//---------------------------------------------------------------------------------------------------------
function hitMine(player, mine) {
    console.log("RUN FUNCTION: hitMine");
    this.sound.play('boom');
    mine.disableBody(true, true);
    //SE VITE PLAYER > 1 --> Damage player
    if (lifeTot > 25) {
        player_damage_bomb();
    }
    //SE VITE PLAYER = 0 --> Kill player
    else {
        this.sound.play('game_over');
        gameOver();
    }
}
//---------------------------------------------------------------------------------------------------------
function hitGrenade(player, grenade) {
    console.log("RUN FUNCTION: hitGrenade");
    this.sound.play('boom');
    grenade.disableBody(true, true);
    //SE VITE PLAYER > 1 --> Damage player
    if (lifeTot > 25) {
        player_damage_bomb();
    }
    //SE VITE PLAYER = 0 --> Kill player
    else {
        this.sound.play('game_over');
        gameOver();
    }
}
//---------------------------------------------------------------------------------------------------------
function hitBasket(player, basket) {
    console.log("RUN FUNCTION: hitBasket");
    if ((SKULL === 1) && (key_A.isDown)) {
        basket.anims.play("open", true);
        SKULL = 0;
        console.log("Basket - Open");
        this.sound.play('open');
        this.sound.play('game_win');
        gameWin();
    } else {
        console.log("Basket - Still close");
    }
}
//---------------------------------------------------------------------------------------------------------
function collectAID(player, first_AID) {
    console.log("RUN FUNCTION: collectAID");
    first_AID.disableBody(true, true);
    AID = 1;
}
//---------------------------------------------------------------------------------------------------------
function collectSkull(player, skull) {
    console.log("RUN FUNCTION: collectSkull");
    this.sound.play('collect_skull');
    skull.disableBody(true, true);
    SKULL = 1;
}
//---------------------------------------------------------------------------------------------------------
function checkAID() {
    console.log("RUN FUNCTION: checkAID");
    if (AID === 1) {
        AID = 0;
        console.log("Kit medico utilizzato");
        lifeTot += 50;
        //Vita massima = 100
        if (lifeTot > 100) {
            lifeTot = 100;
        }
        lifeText.setText('Life: ' + lifeTot);
    } else {
        console.log("Nessun kit medico disponibile");
    }
}
//---------------------------------------------------------------------------------------------------------
function hitEnemy_1(player, enemy_1) {
    console.log("RUN FUNCTION: hitEnemy_1");
    //SE IL PLAYER STA ATTACCANDO
    if (cursors.space.isDown) {
        console.log("player sta attaccando!");
        attackText.setText('Attack: X');
        //SE VITE ENEMY_1 > 0 --> Damage enemy
        if (lifeEnemy_1 > 0) {
            console.log("Enemy_1 - Damage");
            lifeEnemy_1 -= 1;
            console.log("lifeEnemy_1: " + lifeEnemy_1);
        }
        //SE VITE ENEMY_1 = 0 --> Kill enemy
        else {
            enemy_1.anims.play("E1_idle", false);
            enemy_1.anims.play("E1_dead", true);
            enemey_dead();
            enemy_1.disableBody(true, true);
        }
    }
    //SE IL PLAYER NON STA ATTACCANDO
    else {
        console.log("player NON sta attaccando!");
        attackText.setText('Attack: -');
        //SE VITE PLAYER > 1 --> Damage player
        if (lifeTot > 1) {
            player_damage();
        }
        //SE VITE PLAYER = 0 --> Kill player
        else {
            this.sound.play('game_over');
            gameOver();
        }
    }
}
//---------------------------------------------------------------------------------------------------------
function hitEnemy_2(player, enemy_2) {
    console.log("RUN FUNCTION: hitEnemy_2");
    //SE IL PLAYER STA ATTACCANDO
    if (cursors.space.isDown) {
        console.log("player sta attaccando!");
        attackText.setText('Attack: X');
        //SE VITE ENEMY_2 > 0 --> Damage enemy
        if (lifeEnemy_2 > 0) {
            console.log("Enemy_2 - Damage");
            lifeEnemy_2 -= 1;
            console.log("lifeEnemy_2: " + lifeEnemy_2);
        }
        //SE VITE ENEMY_2 = 0 --> Kill enemy
        else {
            enemy_2.anims.play("E2_idle", false);
            enemy_2.anims.play("E2_dead", true);
            enemey_dead();
            enemy_2.disableBody(true, true);
        }
    }
    //SE IL PLAYER NON STA ATTACCANDO
    else {
        console.log("player NON sta attaccando!");
        attackText.setText('Attack: -');
        //SE VITE PLAYER > 1 --> Damage player
        if (lifeTot > 1) {
            player_damage();
        }
        //SE VITE PLAYER = 0 --> Kill player
        else {
            this.sound.play('game_over');
            gameOver();
        }
    }
}
//---------------------------------------------------------------------------------------------------------
function hitEnemy_3(player, enemy_3) {
    console.log("RUN FUNCTION: hitEnemy_3");
    //SE IL PLAYER STA ATTACCANDO
    if (cursors.space.isDown) {
        console.log("player sta attaccando!");
        attackText.setText('Attack: X');
        //SE VITE ENEMY_3 > 0 --> Damage enemy
        if (lifeEnemy_3 > 0) {
            console.log("Enemy_3 - Damage");
            lifeEnemy_3 -= 1;
            console.log("lifeEnemy_3: " + lifeEnemy_3);
        }
        //SE VITE ENEMY_3 = 0 --> Kill enemy
        else {
            enemy_3.anims.play("E3_dead", true);
            enemey_dead();
            enemy_3.disableBody(true, true);
        }
    }
    //SE IL PLAYER NON STA ATTACCANDO
    else {
        console.log("player NON sta attaccando!");
        attackText.setText('Attack: -');
        //SE VITE PLAYER > 1 --> Damage player
        if (lifeTot > 1) {
            player_damage();
        }
        //SE VITE PLAYER = 0 --> Kill player
        else {
            this.sound.play('game_over');
            gameOver();
        }
    }
}
//---------------------------------------------------------------------------------------------------------
function hitEnemy_4(player, enemy_4) {
    console.log("RUN FUNCTION: hitEnemy_4");
    //SE IL PLAYER STA ATTACCANDO
    if (cursors.space.isDown) {
        console.log("player sta attaccando!");
        attackText.setText('Attack: X');
        //SE VITE ENEMY_4 > 0 --> Damage enemy
        if (lifeEnemy_4 > 0) {
            console.log("Enemy_4 - Damage");
            lifeEnemy_4 -= 1;
            console.log("lifeEnemy_4: " + lifeEnemy_4);
        }
        //SE VITE ENEMY_4 = 0 --> Kill enemy
        else {
            enemy_4.anims.play("E4_dead", true);
            enemey_dead();
            enemy_4.disableBody(true, true);
        }
    }
    //SE IL PLAYER NON STA ATTACCANDO
    else {
        console.log("player NON sta attaccando!");
        attackText.setText('Attack: -');
        //SE VITE PLAYER > 1 --> Damage player
        if (lifeTot > 1) {
            player_damage();
        }
        //SE VITE PLAYER = 0 --> Kill player
        else {
            this.sound.play('game_over');
            gameOver();
        }
    }
}
//---------------------------------------------------------------------------------------------------------
function enemey_dead() {
    console.log("Enemy - Kill");
    //INCREMENTO KILL
    killTot += 1;
    killText.setText('Kill: ' + killTot);
    //INCREMENTO SCORE
    scoreTot += 300;
    scoreText.setText('Score: ' + scoreTot);
}
//---------------------------------------------------------------------------------------------------------
function player_damage() {
    console.log("Player - Damage");
    //RIDUZIONE LIFE
    lifeTot -= 1;
    lifeText.setText('Life: ' + lifeTot);
    console.log("lifeTot: " + lifeTot);
    //RIDUZIONE SCORE
    if (scoreTot > 50) {
        scoreTot -= 1;
        scoreText.setText('Score: ' + scoreTot);
        console.log("ScoreTot: " + scoreTot);
    } else {
        console.log("ScoreTot < 50 --> Score non rimosso");
    }
}
//---------------------------------------------------------------------------------------------------------
function player_damage_bomb() {
    console.log("Player - Damage Bomb");
    //RIDUZIONE LIFE
    lifeTot -= 25;
    lifeText.setText('Life: ' + lifeTot);
    console.log("lifeTot: " + lifeTot);
}
//---------------------------------------------------------------------------------------------------------
function gameOver() {
    player.anims.play("dead", true);
    console.log("Player - Kill");
    lifeText.setText('Life: RIP');
    enemy_1.disableBody(true, true);
    enemy_2.disableBody(true, true);
    enemy_3.disableBody(true, true);
    enemy_4.disableBody(true, true);
    mine.disableBody(true, true);
    grenade.disableBody(true, true);
    first_AID.disableBody(true, true);
    basket.disableBody(true, true);
    skull.disableBody(true, true);
    AID = 0;
    gameOverText.setText('Game Over !');
    gameOverText2.setText('Press F5 to restart');
    window.open('./index.html');
}
//---------------------------------------------------------------------------------------------------------
function gameWin() {
    scoreTot += 300;
    scoreText.setText('Score: ' + scoreTot);
    alert("HAI VINTO!\nScore: " + scoreTot + "\nKill: " + killTot + "\nLife: " + lifeTot + "\nTime: " + initialTime);
    enemy_1.disableBody(true, true);
    enemy_2.disableBody(true, true);
    enemy_3.disableBody(true, true);
    enemy_4.disableBody(true, true);
    mine.disableBody(true, true);
    grenade.disableBody(true, true);
    first_AID.disableBody(true, true);
    basket.disableBody(true, true);
    skull.disableBody(true, true);
    gameWinText.setText('Game Win !');
    gameWinText2.setText('Press F5 to restart');
    window.open('./index.html');
}
//---------------------------------------------------------------------------------------------------------
function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var partInSeconds = seconds % 60;
    partInSeconds = partInSeconds.toString().padStart(2, '0');
    return `${minutes}:${partInSeconds}`;
}
//---------------------------------------------------------------------------------------------------------
function onEvent() {
    initialTime += 1;
    timerText.setText('Time: ' + formatTime(initialTime));
}