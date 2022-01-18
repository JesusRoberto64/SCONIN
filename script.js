let renderer;
let camera;
let scene = new THREE.Scene();

// implement particles 
let  parameters;
const materials = [];
let particles;

scene.background = new THREE.Color("rgb(255,0,0)");
camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
//camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
renderer = new THREE.WebGLRenderer({
});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
//renderer.setClearColor(new THREE.Color(0xfefefe));

window.onload = function(){
    let canvas = document.getElementById("welcome");
    canvas.appendChild(renderer.domElement);
   
    camera.position.z = -4.5;
    
    camera.lookAt(0, 0, 0);
    
    //set Particles 
    
    const spr_geometry = new THREE.BufferGeometry();
    const vertices = [];
    const textureLoader = new THREE.TextureLoader();

    
    const sprite1 = textureLoader.load( 'assets/hero/hero-spr-1.png' );
    const sprite2 = textureLoader.load( 'assets/hero/hero-spr-2.png' );
    const sprite3 = textureLoader.load( 'assets/hero/hero-spr-3.png' );
    const sprite4 = textureLoader.load( 'assets/hero/hero-spr-4.png' );
    const sprite5 = textureLoader.load( 'assets/hero/hero-spr-5.png' );

    const sprs = [sprite1,
                 sprite2,
                 sprite3,
                 sprite4,
                 sprite5

    ]
    
    for( let i = 0; i < sprs.length; i++){
        sprs[i].magFilter = THREE.NearestFilter;
        sprs[i].minFilter = THREE.NearestFilter;
    }

    /*
    for ( let i = 0; i < 1; i ++ ) {
        
       // const x = 0;
       // const y = 0;
        
        const z = 0;
        
        
        const x = Math.random() * 2000 - 1000;
        const y = Math.random() * 2000 - 1000;
        //const z = Math.random() * 2000 - 1000;
           
        vertices.push( x, y, z );
        
    }
    */
    /*
    const z = 0;
    const x = Math.random() * 2000 - 1000;
    const y = Math.random() * 2000 - 1000;
    */


    //spr_geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

    parameters = [
        /*
        [[ 1.0, 0.2, 0.5 ], sprite2, 20 ],
        [[ 0.95, 0.1, 0.5 ], sprite3, 15 ],
        [[ 0.90, 0.05, 0.5 ], sprite1, 10 ],
        [[ 0.85, 0, 0.5 ], sprite5, 8 ],
        [[ 0.80, 0, 0.5 ], sprite4, 5 ]
        */
        
        [[ 1.0, 1.0, 1.0 ], sprite2, 1 ],
        [[ 1.0, 1.0, 1.0 ], sprite3, 1 ],
        [[ 1.0, 1.0, 1.0 ], sprite1, 1 ],
        [[ 1.0, 1.0, 1.0 ], sprite5, 1 ],
        [[ 1.0, 1.0, 1.0 ], sprite4, 1 ]
        
    ];
    
    for ( let i = 0; i < parameters.length; i ++ ) { //parameters.length
        //const color = parameters[ i ][ 0 ];
        const sprite = parameters[ i ][ 1 ];
		//const size = parameters[ i ][ 2 ];

        materials[ i ] = new THREE.PointsMaterial( { size: 1.0, map: sprite, depthTest: false, transparent: true } );
        //materials[ i ].color.setHSL( color[ 0 ], color[ 1 ], color[ 2 ] );
        
        const inst_particles = new THREE.Points( geometry, materials[ i ] );
       
        //inst_particles.rotation.x = Math.random() * 7;
		//inst_particles.rotation.y = Math.random() * 8;
		//inst_particles.rotation.z = Math.random() * 6;
       //scene.add( inst_particles );
        
    }

    
    for ( let i = 0; i < scene.children.length; i ++ ){
        
        if (scene.children[i] instanceof THREE.Points ){
            
            particles = scene.children[i];
            //particles.prototype.isPoints = true;
            particles.geometry.computeBoundingBox();
        }
    }
    
};

// white spotlight shining from the side, casting a shadow
let spotLight = new THREE.SpotLight(0xffffff, 2.5, 25, Math.PI / 6);
spotLight.position.set(9, 10, 1);
scene.add(spotLight);

let gridHelper = new THREE.GridHelper(4, 4);
//scene.add(gridHelper);

// example code
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
    color: 0xff0000
});
const topBox = new THREE.Mesh(geometry, material);
topBox.rotation.y +=5.5;
scene.add(topBox);

//Sprite
const pointer = new THREE.Vector2();

let sphereInter;
let raycaster = new THREE.Raycaster();  
let INTERSECTED;

const new_geometry = new THREE.SphereGeometry( 0.1 );
const new_material = new THREE.MeshBasicMaterial( { color: 0x51a8ff  } );

sphereInter = new THREE.Mesh( new_geometry, new_material );
sphereInter.visible = false;
scene.add( sphereInter );


const map = new THREE.TextureLoader().load('assets/logo_blanco.png');
map.magFilter = THREE.NearestFilter;
map.minFilter = THREE.NearestFilter;
const spr_material = new THREE.SpriteMaterial( { map: map } );
const sprite = new THREE.Sprite( spr_material );
sprite.scale.x = 2;
const sprite2 = sprite.clone()
sprite2.position.y += 1.0   ;
scene.add( sprite );
scene.add(sprite2);

window.addEventListener( 'resize', onWindowResize, false );
onWindowResize();

console.log(scene.children);
///// end of example
let animate = function() {
    
    const time = Date.now() * 0.00005;
    
    for ( let i = 0; i < scene.children.length; i ++ ) {

        const object = scene.children[ i ];
           
        if ( object instanceof THREE.Mesh ) {

            
            raycaster.setFromCamera( pointer, camera );
    
           let intersects = raycaster.intersectObject(object);
            

           if ( intersects.length > 0 ) {
           
                if ( INTERSECTED != intersects[ 0 ].object ) {
                    
                    object.rotation.y -= 0.01;
                    console.log("--")
                    //console.log(intersects[0].object.geometry)
                    //console.log(scene.children[i].geometry.vertices)
                    // console.log("touced");
                    sphereInter.visible = true;
					sphereInter.position.copy( intersects[ 0 ].point );
                }
           }else if ( INTERSECTED !== null ) {
       
               INTERSECTED = null;
               sphereInter.visible = false;
           }
           
        }
    }    
 
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

animate();

function updateCamera(ev) {
    
    if (camera.position.z - window.scrollY / 250.0 > -0.3){
        camera.position.y = 4.0 - window.scrollY / 250.0;
        camera.position.z = 2.0 - window.scrollY / 250.0;
    }
    camera.lookAt(0.0,0.0,0.0);
    
}

function onPointerMove( event ) {

    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function move_Particle(){

}

//window.addEventListener("scroll", updateCamera);
document.addEventListener( 'pointermove', onPointerMove );

