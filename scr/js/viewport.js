import * as THREE from 'three';
import { uniforms, material } from './shaders';

let camera;
let scene;
let renderer;
let clock;

export function createViewport(){
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1,1,1,-1,0.1,10);

    renderer = new THREE.WebGLRenderer();

    const welcomeElement = document.getElementById('viewport');

    renderer.setSize( welcomeElement.clientWidth, welcomeElement.clientHeight);
    
    welcomeElement.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2,2);
    clock = new THREE.Clock();

    const plane = new THREE.Mesh( geometry, material );
    scene.add(plane);

    camera.position.z = 1;
}

export function onWindowResize(){
    
    const welcomeElement = document.getElementById('viewport');

    const aspectRatio = welcomeElement.clientWidth / welcomeElement.clientHeight;

    let width, height;
    if (aspectRatio >= 1){
        width = 1;
        height = (welcomeElement.clientHeight / welcomeElement.clientWidth)*width;
    }else{
        width = aspectRatio;
        height = 1;
    }
    camera.left = -width;
    camera.right = width;
    camera.top = height;
    camera.bottom = -height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(welcomeElement.clientWidth, welcomeElement.clientHeight);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    if (uniforms.u_resolution !== undefined){
        uniforms.u_resolution.value.x = welcomeElement.clientWidth;
        uniforms.u_resolution.value.y = welcomeElement.clientHeight;
    }
    
}

export function animate(){
    requestAnimationFrame( animate );
    renderer.render( scene, camera);
    uniforms.u_time.value = clock.getElapsedTime();
}

