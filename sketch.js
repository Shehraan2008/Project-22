// adding the images and the sprites
var heliIMG, heliSprite, pkgSprite, pkgIMG;
var wall1, wall2, wall3;

// adding some clouds
var clouds;
// humans
var humans, peoples;

// addign the bodies
var pkgBody, ground;

// adding the modules
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

// loading the images
function preload() {
  heliIMG = loadImage("helicopter.png");
  pkgIMG = loadImage("package.png");
}

function setup() {
  // creating a canvas
  createCanvas(800, 700);
  // seeting the square at the centre
  rectMode(CENTER);

  // package
  pkgSprite = createSprite(width / 2, 80, 10, 10);
  pkgSprite.addImage(pkgIMG);
  pkgSprite.scale = 0.2;

  // helocopter
  heliSprite = createSprite(width / 2, 200, 10, 10);
  heliSprite.addImage(heliIMG);
  heliSprite.scale = 0.6;

  // ground
  groundSprite = createSprite(width / 2, height - 35, width, 80);
  groundSprite.shapeColor = color(126, 200, 80);

  // creating the engine and th world
  engine = Engine.create();
  world = engine.world;

  // some properteis fo the package body
  pkgBody = Bodies.circle(width / 2, 200, 5, {
    restitution: 0.4,
    isStatic: true,
  });

  // adding them to the world
  World.add(world, pkgBody);

  //Create a Ground
  ground = Bodies.rectangle(width / 2, height - 35, width, 100, {
    isStatic: true,
  });
  World.add(world, ground);
  // creating walls
  wall1 = new Wall(width / 2, height - 75, 200, 20); // sleep centre
  wall2 = new Wall(290, height - 115, 20, 100); // stand right
  wall3 = new Wall(490, height - 115, 20, 100); // stand left

  // running the enigne
  Engine.run(engine);
}

function draw() {
  // centering the rects
  rectMode(CENTER);
  // background
  background(135, 206, 235);

  //the package locations
  pkgSprite.x = pkgBody.position.x;
  pkgSprite.y = pkgBody.position.y;

  // sun
  fill("yellow");
  ellipseMode(RADIUS);
  ellipse(width, height / 2 - 300, 200);
  createClouds();
  drawSprites();
  wall1.show();
  wall2.show();
  wall3.show();

  fill("red");
  textStyle(BOLD);
  textSize(20);
  text("Drop Zone", 345, height - 67);
}

// droping the box
function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    Matter.Body.setStatic(pkgBody, false);
    heliSprite.velocityX = 5;
    createHumans();
    createPeople();
  }
}

function createClouds() {
  if (frameCount % 80 === 0) {
    clouds = createSprite(width + 100, random(0, 400), 150, 30);
    clouds.velocityX = -5;
    clouds.shapeColor = "white";
  }
}

function createHumans() {
  humans = createSprite(random(790, 800), 600, 10, 80);
  humans.velocityX = -5;
  humans.shapeColor = color(
    random(229, 194, 152),
    random(229, 194, 152),
    random(229, 194, 152)
  );
}

function createPeople() {
  peoples = createSprite(random(0, 1), 600, 10, 80);
  peoples.velocityX = 5;
  peoples.shapeColor = color(
    random(229, 194, 152),
    random(229, 194, 152),
    random(229, 194, 152)
  );
}
