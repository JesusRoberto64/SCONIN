let app = new PIXI.Application({
    width: window.innerWidth, height: 600, autoResize: true ,backgroundColor: 0x000000, 
    resolution: window.devicePixelRatio || 1,  
});
// test Cilssions
const movementSpeed = 0.5;
const impulsePower = 2;

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

window.onload = function(){
    let canvas = document.getElementById("welcome");
    canvas.appendChild(app.view);
}

//add Elements of app


const container = new PIXI.Container();
app.stage.addChild(container);

container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

// The green square we will knock about
const greenSquare = new PIXI.Sprite(PIXI.Texture.WHITE);
greenSquare.position.set((app.screen.width - 100) / 2, (app.screen.height - 100) / 2);
greenSquare.width = 25;
greenSquare.height = 25;
greenSquare.tint = '0x00FF00';
greenSquare.acceleration = new PIXI.Point(0);
greenSquare.mass = 6;

const redSquare = new PIXI.Sprite(PIXI.Texture.WHITE);
redSquare.position.set(0,0);
redSquare.width = 50;
redSquare.height = 50;
redSquare.tint = '0x000000';
redSquare.acceleration = new PIXI.Point(0);
redSquare.mass = 0.8;
app.stage.addChild(redSquare);
//container.addChild(greenSquare);



// Create a new texture and sprite
const texture = PIXI.Texture.from('assets/hero/hero-spr-1.png');
for (let i = 0; i < 50; i++) {
    const bunny = new PIXI.Sprite(texture);
    bunny.width = 80;
    bunny.height = 80;
    bunny.anchor.set(0.5);
    bunny.x = (i % 5) * 40;
    bunny.y = Math.floor(i / 5) * 40;
    container.addChild(bunny);
    bunny.acceleration = new PIXI.Point(0);
    bunny.mass = 6;
}

// Center move pivots
container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;

// Listen for animate update
app.ticker.add((delta) => {
    //container.rotation -= 0.01 * delta;
    redSquare.acceleration.set(redSquare.acceleration.x * 0.99, 
    redSquare.acceleration.y * 0.99);
       
    for(let i = 0; i < container.children.length; i++){
        let child =  container.children[i];
        child.acceleration.set(child.acceleration.x * 0.99, 
        child.acceleration.y * 0.99);
    }
    
    const mouseCoords = app.renderer.plugins.interaction.mouse.global;
    
     // If the mouse is off screen, then don't update any further
     if (app.screen.width > mouseCoords.x || mouseCoords.x > 0
        || app.screen.height > mouseCoords.y || mouseCoords.y > 0) {
        // Get the red square's center point
        const redSquareCenterPosition = new PIXI.Point(
            redSquare.x + (redSquare.width * 0.5),
            redSquare.y + (redSquare.height * 0.5),
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
        redSquare.acceleration.set(
            Math.cos(angleToMouse) * redSpeed,
            Math.sin(angleToMouse) * redSpeed,
        );
    }
        
    for(let i = 0; i < container.children.length; i++){
        if (testForAABB(container.children[i], redSquare)){
            const collisionPush = collisionResponse(container.children[i], redSquare);
            // Set the changes in acceleration for both squares
            
            container.children[i].acceleration.set(
                -(collisionPush.x * redSquare.mass),
                -(collisionPush.y * redSquare.mass),
            );
        }

        container.children[i].x += container.children[i].acceleration.x * delta;
        container.children[i].y += container.children[i].acceleration.y * delta;
    }   
    
    redSquare.x += redSquare.acceleration.x * delta;
    redSquare.y += redSquare.acceleration.y * delta;
});

//HTML FUCTIONS and connected
function onWindowResize() {
	const parent = app.view.parentNode;
	// Resize the renderer
	app.renderer.resize(parent.clientWidth, 600);
    // You can use the 'screen' property as the renderer visible
    // area, this is more useful than view.width/height because
    // it handles resolution
    container.position.set(app.screen.width/2, app.screen.height/2); 
}

window.addEventListener( 'resize', onWindowResize, false );