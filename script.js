import * as THREE from "three";

// ---------------- Scene ----------------

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x000010);

// ---------------- Camera ----------------

const camera = new THREE.PerspectiveCamera(

60,

window.innerWidth/window.innerHeight,

0.1,

1000

);

camera.position.z = 18;

// ---------------- Renderer ----------------

const renderer = new THREE.WebGLRenderer({

canvas:document.querySelector("#scene"),

antialias:true

});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(

window.innerWidth,

window.innerHeight

);

// ---------------- Stars ----------------

const starGeometry=new THREE.BufferGeometry();

const starCount=6000;

const positions=[];

for(let i=0;i<starCount;i++){

positions.push(

(Math.random()-0.5)*250,

(Math.random()-0.5)*250,

(Math.random()-0.5)*250

);

}

starGeometry.setAttribute(

"position",

new THREE.Float32BufferAttribute(positions,3)

);

const starMaterial=new THREE.PointsMaterial({

color:0xffffff,

size:0.25

});

const stars=new THREE.Points(

starGeometry,

starMaterial

);

scene.add(stars);

// ---------------- Moon ----------------

const moon=new THREE.Mesh(

new THREE.SphereGeometry(2.5,64,64),

new THREE.MeshStandardMaterial({

color:0xf5f5ff,

emissive:0x999999

})

);

moon.position.set(12,8,-20);

scene.add(moon);

// ---------------- Lights ----------------

scene.add(

new THREE.AmbientLight(

0xffffff,

0.6

)

);

const light=new THREE.DirectionalLight(

0xffffff,

2

);

light.position.set(5,10,10);

scene.add(light);

// ---------------- Password ----------------

const button=document.querySelector("#enter");

const message=document.querySelector("#message");

button.onclick=()=>{

const value=document.querySelector("#password").value;

if(value==="Shoq and Mahmoud"){

message.innerHTML="✨ Welcome...";

}else{

message.innerHTML="Wrong Password";

}

};

// ---------------- Animation ----------------

function animate(){

requestAnimationFrame(animate);

stars.rotation.y+=0.0004;

stars.rotation.x+=0.00015;

renderer.render(scene,camera);

}

animate();

// ---------------- Resize ----------------

window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(

window.innerWidth,

window.innerHeight

);

});