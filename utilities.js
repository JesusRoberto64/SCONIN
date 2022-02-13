
class MyClass {
  constructor(string){
      this.stg = string;
  }
  
  name = "name"
  #second_Name = null;

  init(){
      console.log(this.stg,this.name);
      return this.stg;
  }
  
  setSecond(name){
    this.second_Name = name;
    return this.second_Name
  }

  getString(){
      console.log(this.stg);
      return this.stg;
  }
  setString(string){
      this.stg = string;
  }
  lengthString = function(){
      return this.stg.length
  }
}


//const PIXEL_TO_METER = 1 / 60;

class Mouse {
  constructor(app) {
    //console.log("declared")
    this.app = app;
    //console.log(this.app);
  }
  
  init() {
    const pickPrecision = 5;
    let drag = null;
    let mouseConstraint = {};
    let nullBody = new p2.Body();
    //let { app } = this;
    
    //let { world } = app.world;
    // app.stage.hitArea = new PIXI.Rectangle(-10000, -10000, 20000, 20000);
    //this.app.stage.interactive = true;
    //console.log(this.app);
    
    app.stage.on("mousedown", event => {
      console.log("--");
      endDrag();
      var pixiPoint = app.stage.toLocal(event.data.global);

      var physicsPoint = p2.vec2.create();
      physicsPoint[0] = -pixiPoint.x * PIXEL_TO_METER;
      physicsPoint[1] = -pixiPoint.y * PIXEL_TO_METER;
    
      let result = this.app.hitTest(physicsPoint, this.app.bodies, pickPrecision);
      console.log(result);
      
      // Remove static bodies
      var b;
      while (result.length > 0) {
        b = result.shift();
        if (b.type === p2.Body.STATIC) {
          b = null;
        } else {
          break;
        }
      }

      if (b) {
        drag = b;
        b.wakeUp();
        // Add mouse joint to the body
        var localPoint = p2.vec2.create();
        b.toLocalFrame(localPoint, physicsPoint);
        this.app.addBody(nullBody);
        mouseConstraint = new p2.RevoluteConstraint(nullBody, b, {
          localPivotA: physicsPoint,
          localPivotB: localPoint,
          maxForce: 1000 * b.mass
        });
        this.app.addConstraint(mouseConstraint);
      }
      
    });
    app.stage.on("mousemove", event => {
      if (!drag) {
        return;
      }

      var pixiPoint = app.stage.toLocal(event.data.global);
      var physicsPoint = p2.vec2.create();
      physicsPoint[0] = -pixiPoint.x * PIXEL_TO_METER;
      physicsPoint[1] = -pixiPoint.y * PIXEL_TO_METER;

      p2.vec2.copy(mouseConstraint.pivotA, physicsPoint);
      mouseConstraint.bodyA.wakeUp();
      mouseConstraint.bodyB.wakeUp();
    });
    function endDrag() {
      if (!drag) {
        return;
      }
      drag = null;
      this.app.removeConstraint(mouseConstraint);
      mouseConstraint = null;
      this.app.removeBody(nullBody);
    }
    app.stage.on("mouseup", event => {
      endDrag();
    });
    
  }
  
}


