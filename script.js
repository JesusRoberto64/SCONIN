let app = new PIXI.Application({
    width: window.innerWidth, height: 400, autoResize: true ,backgroundColor: 0x000000, 
});
//convert pixi to p2
const PIXEL_TO_METER = 1/300;

//let stage = new p2;
let world = new p2.World();

// Pre-fill object pools. Completely optional but good for performance!
//world.overlapKeeper.recordPool.resize(16);
//world.narrowphase.contactEquationPool.resize(1024);
//world.narrowphase.frictionEquationPool.resize(1024);

// Set stiffness of all contacts and constraints
//world.setGlobalStiffness(1e8);
// Max number of solver iterations to do
//world.solver.iterations = 20;

// Solver error tolerance
//world.solver.tolerance = 0.02;

// Enables sleeping of bodies
//world.sleepMode = p2.World.BODY_SLEEPING;

let boxShape = new p2.Box({ width: 1, height: 1 });
let boxBody = new p2.Body({mass:2.5, position:[0,3]});

boxBody.addShape(boxShape);
//world.addBody(boxBody);

// Initiate p2 body for sprite
let circle_Shape = new p2.Circle({radius: 1 })
var circle_Body = new p2.Body({mass: 3.3, position: [2, 3], angularVelocity:1 });

circle_Body.addShape(circle_Shape);
world.addBody(circle_Body);

// Add a plane
planeShape = new p2.Plane();
planeBody = new p2.Body({ position:[0,-1] });
planeBody.addShape(planeShape);
world.addBody(planeBody);

// Pixi.js zoom level
let zoom = 60;

// ======================================================================

// Scale mode for all textures, will retain pixelation
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
// test Cilssions
const movementSpeed = 0.08;
const impulsePower = 2.0;

document.body.appendChild(app.view)

// Make stage interactive so you can click on screen
app.stage.interactive = true;
app.stage.hitArea = app.renderer.screen;
app.stage.on('pointerdown', onDragMove);
//============================================================================


//console.log(world);

//let m = new Mouse(world);
//m.init();

//let point = new p2.vec2.create();
//let result = world.hitTest(point,world.bodies,5); 
//console.log(result);


//================================================================================
let is_Touched = false;
let Touche_pos = {x:0,y:0}

window.onload = function(){
    let canvas = document.getElementById("welcome");
    canvas.appendChild(app.view);

    const navigation = document.getElementById("navigation");
    navigation.style.display = "none";
    
    //document.body.appendChild(app.view)
}

//Sconin Sprite
const sconin_Container = new PIXI.Container();
app.stage.addChild(sconin_Container);
sconin_Container.x = app.screen.width / 2;
sconin_Container.y = app.screen.height / 2;

const sconin_Text = new PIXI.Texture.from('assets/logo_blanco.png');
const sconin_Spr = new PIXI.Sprite(sconin_Text);
sconin_Spr.anchor.set(0.5,0.5);
sconin_Spr.width = 350;
sconin_Spr.height = 150;
sconin_Container.addChild(sconin_Spr);


// CONTAINER FOR p2 INTEGRATION ==================================

let container_p2 = new PIXI.Container();
app.stage.addChild(container_p2);
container_p2.x = app.screen.width / 2;
container_p2.y = app.screen.height / 2;
container_p2.scale.x = zoom;
container_p2.scale.y = -zoom;

let graphics = new PIXI.Graphics();
graphics.beginFill(0xff0000);
graphics.drawRect(-boxShape.width/2, -boxShape.height/2, boxShape.width, boxShape.height);

// put test for sprite 
const texture_P2 = PIXI.Texture.from('assets/hero/hero-spr-3.png');
let sprite_P2 = new PIXI.Sprite(texture_P2);
sprite_P2.width = 2;
sprite_P2.height = 2;
sprite_P2.anchor.set(0.5,0.5);

container_p2.addChild(graphics, sprite_P2);

// ===============================================================

// ADD SRPITES CONTENER add Elements of app
const container = new PIXI.Container();
app.stage.addChild(container);
container.x = (app.screen.width / 2) + 40;
container.y = (app.screen.height / 2) + 50;

const BlackSquare = new PIXI.Sprite(PIXI.Texture.WHITE);
BlackSquare.position.set(-40,-200);
BlackSquare.width = 60;
BlackSquare.height = 60;
BlackSquare.tint = '0xff0000';
BlackSquare.acceleration = new PIXI.Point(0);
BlackSquare.mass = 0.8;
//BlackSquare.alpha = 0.0;
app.stage.addChild(BlackSquare);
/* 
// Create a new texture and sprite
const texture = PIXI.Texture.from('assets/hero/hero-spr-1.png');
for (let i = 0; i < 360; i++) {
    const spr = new PIXI.Sprite(texture);
    spr.width = 25;//80
    spr.height = 25;//80
    spr.anchor.set(0.5);
    spr.x = (i % 40) * 20;//6//80
    spr.y = Math.floor(i / 14) * 20;//6//80
    container.addChild(spr);
    spr.acceleration = new PIXI.Point(0);
    spr.mass = 4;
}
*/
// Center move pivots
container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;
let debug = 0;
// Listen for animate update

app.ticker.add((delta) => {
    // p2 physics integration==========================================
       world.step(1/60);
        // Transfer positions of the physics objects to Pixi.js
        graphics.position.x = boxBody.position[0];
        graphics.position.y = boxBody.position[1];
        graphics.rotation =   boxBody.angle;

        // new sprite position 
        sprite_P2.position.x = circle_Body.position[0];
        sprite_P2.position.y = circle_Body.position[1];
        sprite_P2.rotation = circle_Body.angle;

    //==================================================================
    BlackSquare.position.x = Touche_pos.x;
    BlackSquare.position.y = Touche_pos.y;
    
});

//HTML FUCTIONS and connected
function onWindowResize() {
	const parent = app.view.parentNode;
	// Resize the renderer
	app.renderer.resize(parent.clientWidth, 400);
    container.position.set(app.screen.width/2, app.screen.height/2);
    sconin_Container.position.set(app.screen.width/2, app.screen.height/2);
}

function onDragMove(event) {
    is_Touched = true;
    Touche_pos = event.data.global;
    //app.backgroundColor = 0xdb7272;
    app.renderer.backgroundColor = 0xdb7272;
    
    var physicsPoint = p2.vec2.create();
    
    physicsPoint[0] = -Touche_pos.x * PIXEL_TO_METER;
    physicsPoint[1] = -Touche_pos.y * PIXEL_TO_METER;
    //console.log(Touche_pos.x," ",Touche_pos.y);
    //console.log(physicsPoint[0],physicsPoint[1]);

    let result = world.hitTest(physicsPoint,world.bodies,5);
    //onsole.log(result);
    if (result.length > 0){
        console.log("mass",result[0].position);
        
    }
}

window.addEventListener( 'resize', onWindowResize, false );

