var mainCyclist,
    mainplayer2;
var roadImg;
var greenCar,
    blueCar,
    yellowCar;

var END = 0;
var PLAY = 1;
var gameState = PLAY;


var greenCG,
    yellowCG,
    blueCG;
var distance = 0
var gameOver

function preload() {
    mainCyclistImg = loadAnimation("images/mainPlayer1.png", "images/mainPlayer2.png");
    mainplayer2 = loadImage("images/mainPlayer3.png")
    roadImg = loadImage("images/maxresdefault.jpeg")
    greenCarImg = loadImage("images/greenCarImg.png")
    blueCarImg = loadImage("images/blueCarImg.png")
    yellowCarImg = loadImage("images/yellowCarImg.png")
    gameOverImg = loadImage("images/gameover.jpeg")
}

function setup() {
    createCanvas(1200, 300);
    path = createSprite(100, 150);
    path.addImage(roadImg);
    path.velocityX = -5;

    mainCyclist = createSprite(70, 150);
    mainCyclist.addAnimation("mainCyclist_Running", mainCyclistImg)
    mainCyclist.scale = 0.07;

    gameOver = createSprite(650, 150);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.8;
    gameOver.visible = false;


    greenCG = new Group();
    yellowCG = new Group();
    blueCG = new Group();

    gameOver = createSprite(650, 100);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.8;
    gameOver.visible = false;


    upArrowText = createDiv("Press Up Arrow to Restart the game");
    upArrowText.style('font-size', '22px');
    upArrowText.position(500, 200);
    upArrowText.style('color','white');


}

function draw() {
    background(0);

    drawSprites();
    textSize(20);
    fill(255);
    text("Distance: " + distance, 900, 30);
    // text("Distance: " + distance, 900, 30);
    if (gameState === PLAY) {
        upArrowText.hide();

        gameOverImg.visible = false
        distance = distance + Math.round(getFrameRate() / 50);
        path.velocityX = -(6 + 2 * distance / 150);

        mainCyclist.y = World.mouseY

        edges = createEdgeSprites();
        mainCyclist.collide(edges);

        if (path.x < 0) {
            path.x = width / 2;
        }
        var select_oppPlayer = Math.round(random(1, 3));

        if (World.frameCount % 60 == 0) {
            if (select_oppPlayer == 1) {
                greenCars();
            } else if (select_oppPlayer == 2) {
                yellowCars();
            } else {
                blueCars();
            }
        }

        if (greenCG.isTouching(mainCyclist)) {
            gameState = END;
            greenCar.velocityY = 0;

        }

        if (yellowCG.isTouching(mainCyclist)) {
            gameState = END;
            yellowCar.velocityY = 0;

        }

        if (blueCG.isTouching(mainCyclist)) {
            gameState = END;
            blueCar.velocityY = 0;
            // mainCyclist.velocity


        }
    } else if (gameState === END) {
        gameOver.visible = true;
        upArrowText.show();
        // Add code to show restart game instrution in text here
        if (keyDown(UP_ARROW)) {
            reset();
        } else {
            path.velocityX = 0;
            mainCyclist.velocityY = 0;
            mainCyclist.addAnimation("mainCyclist_Running", mainplayer2);
            gameOver.visible = true;

        }
    }
}
function greenCars() {
    greenCar = createSprite(1100, Math.round(random(50, 250)));
    greenCar.scale = 0.06;
    greenCar.velocityX = -(6 + 2 * distance / 150);
    greenCar.addImage(greenCarImg);
    greenCar.setLifetime = 170;
    greenCG.add(greenCar);
}

function yellowCars() {
    yellowCar = createSprite(1100, Math.round(random(50, 250)));
    yellowCar.scale = 0.06;
    yellowCar.velocityX = -(6 + 2 * distance / 150);
    yellowCar.addImage(yellowCarImg);
    yellowCar.setLifetime = 170;
    yellowCG.add(yellowCar);
}

function blueCars() {
    blueCar = createSprite(1100, Math.round(random(50, 250)));
    blueCar.scale = 0.06;
    blueCar.velocityX = -(6 + 2 * distance / 150);
    blueCar.addImage(blueCarImg);
    blueCar.setLifetime = 170;
    blueCG.add(blueCar);
}
function reset() {
    console.log("In reset....");
    mainCyclist.addAnimation("mainCyclist_Running", mainCyclistImg);
    gameState = PLAY;
    gameOver.visible = false;

    blueCG.destroyEach();
    greenCG.destroyEach();
    yellowCG.destroyEach();

    distance=0
}
