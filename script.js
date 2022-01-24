let app = new PIXI.Application({
    width: window.innerWidth, height: 600, autoResize: true ,backgroundColor: 0x000000, 
    resolution: window.devicePixelRatio || 1,  
});
// Scale mode for all textures, will retain pixelation
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
// test Cilssions
const movementSpeed = 0.5;
const impulsePower = 0.5;

// Test For Hit
// A basic AABB check between two different squares
function testForAABB(object1, object2) {
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    return bounds1.x < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y;
}

// Calculates the results of a collision, allowing us to give an impulse that
// shoves objects apart
function collisionResponse(object1, object2) {
    if (!object1 || !object2) {
        return new PIXI.Point(0);
    }

    const vCollision = new PIXI.Point(
        object2.x - object1.x,
        object2.y - object1.y,
    );

    const distance = Math.sqrt(
        (object2.x - object1.x) * (object2.x - object1.x)
        + (object2.y - object1.y) * (object2.y - object1.y),
    );

    const vCollisionNorm = new PIXI.Point(
        vCollision.x / distance,
        vCollision.y / distance,
    );

    const vRelativeVelocity = new PIXI.Point(
        object1.acceleration.x - object2.acceleration.x,
        object1.acceleration.y - object2.acceleration.y,
    );

    const speed = vRelativeVelocity.x * vCollisionNorm.x
        + vRelativeVelocity.y * vCollisionNorm.y;

    const impulse = impulsePower * speed / (object1.mass + object2.mass);

    return new PIXI.Point(
        impulse * vCollisionNorm.x,
        impulse * vCollisionNorm.y,
    );
}

// Calculate the distance between two given points
function distanceBetweenTwoPoints(p1, p2) {
    const a = p1.x - p2.x;
    const b = p1.y - p2.y;

    return Math.hypot(a, b);
}
document.body.appendChild(app.view)

window.onload = function(){
    let canvas = document.getElementById("welcome");
    canvas.appendChild(app.view);

    const navigation = document.getElementById("navigation");
    navigation.style.display = "none";
}

//Sconin Sprite
const sconin_Container = new PIXI.Container();
app.stage.addChild(sconin_Container);
sconin_Container.x = app.screen.width / 2;
sconin_Container.y = app.screen.height / 2;
//sconin_Container.pivot.x = sconin_Container.width / 2; 
//sconin_Container.pivot.y = sconin_Container.height / 2; 

const sconin_Text = new PIXI.Texture.from('assets/logo_blanco.png');
const sconin_Spr = new PIXI.Sprite(sconin_Text);
sconin_Spr.anchor.set(0.5,0.5);
sconin_Spr.width = 350;
sconin_Spr.height = 150;
sconin_Container.addChild(sconin_Spr);

//add Elements of app
const container = new PIXI.Container();
app.stage.addChild(container);
container.x = (app.screen.width / 2) + 40;
container.y = (app.screen.height / 2) + 50;


const BlackSquare = new PIXI.Sprite(PIXI.Texture.WHITE);
BlackSquare.position.set(-1000,-1000);
BlackSquare.width = 80;
BlackSquare.height = 80;
BlackSquare.tint = '0x000000';
BlackSquare.acceleration = new PIXI.Point(0);
BlackSquare.mass = 0.8;
BlackSquare.alpha = 0.0;
app.stage.addChild(BlackSquare);

// Create a new texture and sprite
const texture = PIXI.Texture.from('assets/hero/hero-spr-1.png');
for (let i = 0; i < 36; i++) {
    const spr = new PIXI.Sprite(texture);
    spr.width = 80;
    spr.height = 80;
    spr.anchor.set(0.5);
    spr.x = (i % 6) * 80;
    spr.y = Math.floor(i / 6) * 80;
    container.addChild(spr);
    spr.acceleration = new PIXI.Point(0);
    spr.mass = 10;
}

// Center move pivots
container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;

// Listen for animate update
app.ticker.add((delta) => {
    //container.rotation -= 0.001 * delta;
    BlackSquare.acceleration.set(BlackSquare.acceleration.x * 0.99, 
    BlackSquare.acceleration.y * 0.99);
    
    const mouseCoords = app.renderer.plugins.interaction.mouse.global;
    
    // If the mouse is off screen, then don't update any further
    if (app.screen.width > mouseCoords.x || mouseCoords.x > 0
        || app.screen.height > mouseCoords.y || mouseCoords.y > 0) {
        
        
        // Get the red square's center point
        const redSquareCenterPosition = new PIXI.Point(
            BlackSquare.x + (BlackSquare.width * 0.5),
            BlackSquare.y + (BlackSquare.height * 0.5),
        );

        // Calculate the direction vector between the mouse pointer and
        // the red square
        const toMouseDirection = new PIXI.Point(
            mouseCoords.x - redSquareCenterPosition.x,
            mouseCoords.y - redSquareCenterPosition.y,
        );

        // Use the above to figure out the angle that direction has
        const angleToMouse = Math.atan2(
            toMouseDirection.y,
            toMouseDirection.x,
        );

        // Figure out the speed the square should be travelling by, as a
        // function of how far away from the mouse pointer the red square is
        const distMouseRedSquare = distanceBetweenTwoPoints(
            mouseCoords,
            redSquareCenterPosition,
        );
        const redSpeed = distMouseRedSquare * movementSpeed;

        // Calculate the acceleration of the red square
        BlackSquare.acceleration.set(
            Math.cos(angleToMouse) * redSpeed,
            Math.sin(angleToMouse) * redSpeed,
        );
    }
        
    for(let i = 0; i < container.children.length; i++){
        let child =  container.children[i];
        child.rotation -= 0.003 * delta;
        child.acceleration.set(child.acceleration.x * 0.99, 
        child.acceleration.y * 0.99);

        if (testForAABB(container.children[i], BlackSquare)){
            const collisionPush = collisionResponse(container.children[i], BlackSquare);
            // Set the changes in acceleration for both squares
            /*
            redSquare.acceleration.set(
                (collisionPush.x * container.children[i].mass),
                (collisionPush.y * container.children[i].mass),
            );
            */    
            container.children[i].acceleration.set(
                -(collisionPush.x * BlackSquare.mass),
                -(collisionPush.y * BlackSquare.mass),
            );
        }

        container.children[i].x += container.children[i].acceleration.x * delta;
        container.children[i].y += container.children[i].acceleration.y * delta;
    }   
    
    BlackSquare.x += BlackSquare.acceleration.x * delta;
    BlackSquare.y += BlackSquare.acceleration.y * delta;
});

//HTML FUCTIONS and connected
function onWindowResize() {
	const parent = app.view.parentNode;
	// Resize the renderer
	app.renderer.resize(parent.clientWidth, 600);
    container.position.set(app.screen.width/2, app.screen.height/2);
    sconin_Container.position.set(app.screen.width/2, app.screen.height/2);

}

window.addEventListener( 'resize', onWindowResize, false );