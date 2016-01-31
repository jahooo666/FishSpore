//gra oparta w znacznej części na kodzie przekopiowanym z http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/


// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 600;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.jpg";

// hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "images/hero.png";

//badFish image
var badFishReady = false;
var badFishImage = new Image();
badFishImage.onload = function () {
    badFishReady = true;
};
badFishImage.src = "images/badFish.png";


// Game objects
var Hero = function () {
    this.speed = 256; // movement in pixels per second
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.fishCaught = 0;
    this.alive = true;
};

var BadFish = function () {
    this.speed = 0.2; // movement in pixels per second
    this.x = 32 + (Math.random() * (canvas.width - 64));
    this.y = 32 + (Math.random() * (canvas.height - 64));
    this.alive = true;
};

hero = new Hero();
hero1 = new Hero();
hero2 = new Hero();

var heroes = [];
heroes.push(hero);
heroes.push(hero1);
heroes.push(hero2);

var enemies = [];
enemy1 = new BadFish();
enemy2 = new BadFish();
enemy3 = new BadFish();
enemy4 = new BadFish();
enemy5 = new BadFish();
enemy6 = new BadFish();
enemies.push(enemy1);
enemies.push(enemy2);
enemies.push(enemy3);
enemies.push(enemy4);
enemies.push(enemy5);
enemies.push(enemy6);

var badFish = {
    x: 0,
    y: 0
};


// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);


// Reset the game when the player catches a badFish
var reset = function () {
};


// Update game objects
var update = function (modifier) {
    if (38 in keysDown) { // Player holding up
        if (hero.y > 0) {
            hero.y -= hero.speed * modifier;
        }
    }
    if (40 in keysDown) { // Player holding down
        if (hero.y < canvas.height - 20) {
            hero.y += hero.speed * modifier;
        }
    }
    if (37 in keysDown) { // Player holding left
        hero.x -= hero.speed * modifier;
        hero.dir = 0;   //left
    }
    if (39 in keysDown) { // Player holding right
        hero.x += hero.speed * modifier;
        hero.dir = 1; //right
    }
    if (9 in keysDown) { // Player holding right
        a = new Hero();
        heroes.push(a);
        console.log(heroes.length);
    }

    if (87 in keysDown) { // Player holding up
        if (hero1.y > 0) {
            hero1.y -= hero1.speed * modifier;
        }
    }
    if (83 in keysDown) { // Player holding down
        if (hero1.y < canvas.height - 20) {
            hero1.y += hero1.speed * modifier;
        }
    }
    if (65 in keysDown) { // Player holding left
        hero1.x -= hero1.speed * modifier;
    }
    if (68 in keysDown) { // Player holding right
        hero1.x += hero1.speed * modifier;
    }
    for (i = 0; i < heroes.length; i++) {

        for (j = 0; j < enemies.length; j++) {
            if ((enemies[j].x) > canvas.width) {
                enemies[j].x = -30;
            }
            enemies[j].x += enemies[j].speed;
        }

        lhero = heroes[i];
        for (j = 0; j < heroes.length; j++) {
            if (j != i) {
                lhero1 = heroes[j];
                if (lhero1.alive
                    && lhero.alive
                    && lhero.x <= (lhero1.x + heroImage.width)
                    && lhero1.x <= (lhero.x + heroImage.width)
                    && lhero.y <= (lhero1.y + heroImage.height)
                    && lhero1.y <= (lhero.y + heroImage.height)
                    && lhero.fishCaught > (lhero1.fishCaught + 5)
                //powinno byc do konkretnego obiektu ale na razie walic
                ) {
                    //zabieramy mu wszystkie zjedzone rybki i killym
                    (lhero.fishCaught) = lhero.fishCaught + lhero1.fishCaught;
                    lhero1.fishCaught = 0;
                    lhero1.alive = false;
                    reset();
                }
            }
        }

        //zjadanie wrogów
        for (j = 0; j < enemies.length; j++) {
            lenemy = enemies[j];
            if (lenemy.alive
                && lhero.alive
                && lhero.x <= (lenemy.x + heroImage.width)
                && lenemy.x <= (lhero.x + heroImage.width)
                && lhero.y <= (lenemy.y + heroImage.height)
                && lenemy.y <= (lhero.y + heroImage.height)
            ) {
                lhero.fishCaught++;
                lenemy.alive=false;
                lenemy = new BadFish();
                enemies.push(lenemy);
            }

        }



    }
};

document.getElementById('button').onclick = function () {
    var newhero = new Hero;
    heroes.push(newhero);
};


// Draw everything
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (heroReady) {
        for (i = 0; i < heroes.length; i++) {
            lhero = heroes[i];
            if (lhero.alive) {
                ctx.drawImage(heroImage, lhero.x, lhero.y, heroImage.width * (1 + lhero.fishCaught / 30), heroImage.height * (1 + lhero.fishCaught / 30));
            }
        }
    }

    if (badFishReady) {
        for (i = 0; i < enemies.length; i++) {
            if (enemies[i].alive) {
                ctx.drawImage(badFishImage, enemies[i].x, enemies[i].y);
            }
        }
    }

    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "12px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    for (i = 0; i < heroes.length; i++) {
        lhero = heroes[i];
        if (lhero.alive) {
            ctx.fillText("Player " + i + " fish eaten: " + lhero.fishCaught, 16, (i * 1) * 16);
        }
    }
    //ctx.fillText("Fish eaten: " + hero.fishCaught, 32, 32);
};


// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);
    render();

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(main);
};


// Let's play this game!
var then = Date.now();
reset();
main();
