let renderer;
let camera;

let scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(0,0,0)");
camera = new THREE.PerspectiveCamera(54, window.innerWidth / window.innerHeight, 0.1, 1000);
//camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
renderer = new THREE.WebGLRenderer({
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0xfefefe));

window.onload = function(){
    let canvas = document.getElementById("welcome");
    canvas.appendChild(renderer.domElement);
    /*
    if (window.scrollY / 250.0 < 4.0){
        camera.position.x = 0.0;
        camera.position.y = 4.0;//- window.scrollY / 250.0;
        camera.position.z = 2.0 ;//- window.scrollY / 250.0;

    
    }else{
        camera.position.x = 0.0;
        camera.position.y = 0.1;
        camera.position.z = -2.0;
    }
    */
    camera.position.x = 0.0;
    camera.position.y = 0.1;
    camera.position.z = -3.5;

    camera.lookAt(0, 0, 0);
};

// white spotlight shining from the side, casting a shadow
let spotLight = new THREE.SpotLight(0xffffff, 2.5, 25, Math.PI / 6);
spotLight.position.set(9, 10, 1);
scene.add(spotLight);

let gridHelper = new THREE.GridHelper(4, 4);
scene.add(gridHelper);

// example code
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
    color: 0xff0000
});
const topBox = new THREE.Mesh(geometry, material);
//scene.add(topBox);

//Sprite
let pointer = new THREE.Vector2(2.0,2.0);
let raycaster = new THREE.Raycaster();
let INTERSECTED;

const map = new THREE.TextureLoader().load('assets/logo_blanco.png');
const spr_material = new THREE.SpriteMaterial( { map: map } );
const sprite = new THREE.Sprite( spr_material );
sprite.scale.x = 2

console.log(sprite.scale);
scene.add( sprite );

window.addEventListener( 'resize', onWindowResize, false );
onWindowResize();

///// end of example
let animate = function() {
    raycaster.setFromCamera( pointer, camera );
    const intersects = raycaster.intersectObject(sprite );
    if ( intersects.length > 0 ) {

        if ( INTERSECTED != intersects[ 0 ].object ) {
            
            sprite.position.x += .01;   
        }
    }else if ( INTERSECTED !== null ) {

        INTERSECTED = null;
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
    /*
    if (camera.position.z - window.scrollY / 250.0 > -6.08){
        camera.position.y = 4.0 - window.scrollY / 250.0;
        camera.position.z = 2.0 - window.scrollY / 250.0;
    }
    camera.lookAt(0.0,0.0,0.0);
    */
}

function onPointerMove( event ) {

    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function move_Particle(){

}

//window.addEventListener("scroll", updateCamera);
document.addEventListener( 'pointermove', onPointerMove );

