import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';


// Setup

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
//camera.position.setX(-3);

renderer.render(scene, camera);

// Background

const spaceTexture = new THREE.TextureLoader().load('utils/space.jpg');
scene.background = spaceTexture;

// Sun
const sunTexture = new THREE.TextureLoader().load('utils/sun.jpg');
const normalTexture = new THREE.TextureLoader().load('utils/normal.jpg');

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(100, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    normalMap: normalTexture,
  })
);
scene.add(sun);
sun.position.z = -500;

//Earth
const earthTexture = new THREE.TextureLoader().load('utils/earth_hd.jpg');

const geometry = new THREE.SphereGeometry( 15, 32, 16 ); 
const material = new THREE.MeshStandardMaterial( { map:earthTexture, normalMap:normalTexture} ); 
const earth = new THREE.Mesh( geometry, material ); 

scene.add( earth );
sun.add(earth);

// Moon

const moonTexture = new THREE.TextureLoader().load('utils/moon.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

earth.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

//parent rotation
const moonObj=new THREE.Object3D();
moonObj.add(moon);
scene.add(moonObj);

const sunObj=new THREE.Object3D();
sunObj.add(earth);
scene.add(sunObj);





// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0,0, -300);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


// Helpers

 //const lightHelper = new THREE.PointLightHelper(pointLight)
 //const gridHelper = new THREE.GridHelper(200, 50);
 //scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);





function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(5000));

  star.position.set(x, y, z);
  sun.add(star);
}

Array(20000).fill().forEach(addStar);


// Object

//const jeffTexture = new THREE.TextureLoader().load('jeff.png');
//const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));
//scene.add(jeff);


//kage
const l = new THREE.SphereGeometry( 50, 100,4 );
const wireframe = new THREE.WireframeGeometry( l );
const line = new THREE.LineSegments( wireframe );
line.material.depthTest = false;
line.material.opacity = 0.10;
line.material.transparent = true;
scene.add( line );



/*
const geo = new THREE.TorusGeometry( 100, 30, 160, 1000 ); 
const mat = new THREE.RawShaderMaterial( {

	uniforms: {
		time: { value: 1.0 }
	},
	vertexShader: document.getElementById( 'vertexShader' ).textContent,
	fragmentShader: document.getElementById( 'fragmentShader' ).textContent,

} );
const torus = new THREE.Mesh( geo, mat ); scene.add( torus );
*/


//inele soare

/*
//asteroid pamant
const vertices = [];

for ( let i = 0; i < 100; i ++ ) {
	const x = THREE.MathUtils.randFloatSpread( 100 );
	const y = THREE.MathUtils.randFloatSpread( 20 );
	const z = THREE.MathUtils.randFloatSpread( 20 );

	vertices.push( x, y, z );
}
*/
const geometr = new THREE.TorusGeometry( 400, 30, 16, 100 ); 
const geometr1 = new THREE.TorusGeometry( 300, 30, 30, 100 ); 
const geometr2 = new THREE.TorusGeometry( 200, 30, 50, 100 ); 
//eometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
const materia = new THREE.PointsMaterial( { color: 0xFFBF00} );
const points = new THREE.Points( geometr, materia );
const points1 = new THREE.Points( geometr1, materia );
const points2 = new THREE.Points( geometr2, materia );
sun.add( points );
sun.add( points1 );
sun.add( points2 );


/*

//create flame that orbits the sun
class CustomSinCurve extends THREE.Curve {

	constructor( scale = 1 ) {
		super();
		this.scale = scale;
	}

	getPoint( t, optionalTarget = new THREE.Vector3() ) {

		const tx = t * 3 - 1.5;
		const ty = Math.sin( 2 * Math.PI * t );
		const tz = 0;

		return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
	}
}


function createFlame(size,texture,position){
const flame = new THREE.TubeGeometry( size, 20, 2);
const material_flame = new THREE.MeshStandardMaterial.TextureLoader.load(texture);
const mesh = new THREE.Mesh( flame, material_flame );

const obj=new THREE.Object3D();
obj.add(mesh);
scene.add(obj);
mesh.position.x=position;
return{mesh,obj}
}

const f=createFlame(10,sunTexture,50); 

//f.position.z = -500;

*/


//explore
const explore=$(".explore");
var explorer=false;

explore.click(()=>{
  const t = document.body.getBoundingClientRect().top;
  camera.position.z=explorer?(t * 15):40;
  explore[0].innerHTML=explorer?'Zoom':'Go back';
  explorer=!explorer;
})














function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  sun.rotation.x += 0.05;
  sun.rotation.y += 0.075;
  sun.rotation.z += 0.05;

 // jeff.rotation.y += 0.01;
 // jeff.rotation.z += 0.01;

  camera.position.z = t * 15;
  camera.position.x = t * 2;
  camera.rotation.y = t * 25;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  earth.rotation.y += 0.0015;
  moon.rotation.y += 0.005;
  sun.rotation.x+=0.00025;
  moonObj.rotation.y+= 0.005;
  sunObj.rotation.y+= 0.0005;
  //f.rotation.y+= 0.005;

  controls.update();

  renderer.render(scene, camera);
}

animate();





//particles
function addFlame() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xD9D9ED});
  const f = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(70));

  f.position.set(x, y, z);
  scene.add(f);
}

Array(300).fill().forEach(addFlame);

//particle sun
function addFl() {
  const geometry = new THREE.SphereGeometry(25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xD9D9ED});
  const f = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(70));

  f.position.set(x, y, z);
  sun.add(f);
}

Array(300).fill().forEach(addFl);












/*
const _VS = `
uniform float pointMultiplier;
attribute float size;
attribute float angle;
attribute vec4 colour;
varying vec4 vColour;
varying vec2 vAngle;
void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = size * pointMultiplier / gl_Position.w;
  vAngle = vec2(cos(angle), sin(angle));
  vColour = colour;
}`;

const _FS = `
uniform sampler2D diffuseTexture;
varying vec4 vColour;
varying vec2 vAngle;
void main() {
  vec2 coords = (gl_PointCoord - 0.5) * mat2(vAngle.x, vAngle.y, -vAngle.y, vAngle.x) + 0.5;
  gl_FragColor = texture2D(diffuseTexture, coords) * vColour;
}`;


class LinearSpline {
  constructor(lerp) {
    scene._points = [];
    scene._lerp = lerp;
  }

  AddPoint(t, d) {
    scene._points.push([t, d]);
  }

  Get(t) {
    let p1 = 0;

    for (let i = 0; i < scene._points.length; i++) {
      if (scene._points[i][0] >= t) {
        break;
      }
      p1 = i;
    }

    const p2 = Math.min(scene._points.length - 1, p1 + 1);

    if (p1 == p2) {
      return scene._points[p1][1];
    }

    return scene._lerp(
        (t - scene._points[p1][0]) / (
            scene._points[p2][0] - scene._points[p1][0]),
        scene._points[p1][1], scene._points[p2][1]);
  }
}


class ParticleSystem {
  constructor(params) {
    const uniforms = {
        diffuseTexture: {
            value: new THREE.TextureLoader().load('./utils/sun.jpg')
        },
        pointMultiplier: {
            value: window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))
        }
    };

    scene._material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: _VS,
        fragmentShader: _FS,
        blending: THREE.AdditiveBlending,
        depthTest: true,
        depthWrite: false,
        transparent: true,
        vertexColors: true
    });

    scene._camera = params.camera;
    scene._particles = [];

    scene._geometry = new THREE.BufferGeometry();
    scene._geometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3));
    scene._geometry.setAttribute('size', new THREE.Float32BufferAttribute([], 1));
    scene._geometry.setAttribute('colour', new THREE.Float32BufferAttribute([], 4));
    scene._geometry.setAttribute('angle', new THREE.Float32BufferAttribute([], 1));

    scene._points = new THREE.Points(scene._geometry, scene._material);

    params.parent.add(scene._points);

    scene._alphaSpline = new LinearSpline((t, a, b) => {
      return a + t * (b - a);
    });
    scene._alphaSpline.AddPoint(0.0, 0.0);
    scene._alphaSpline.AddPoint(0.1, 1.0);
    scene._alphaSpline.AddPoint(0.6, 1.0);
    scene._alphaSpline.AddPoint(1.0, 0.0);

    scene._colourSpline = new LinearSpline((t, a, b) => {
      const c = a.clone();
      return c.lerp(b, t);
    });
    scene._colourSpline.AddPoint(0.0, new THREE.Color(0xFFFF80));
    scene._colourSpline.AddPoint(1.0, new THREE.Color(0xFF8080));

    scene._sizeSpline = new LinearSpline((t, a, b) => {
      return a + t * (b - a);
    });
    scene._sizeSpline.AddPoint(0.0, 1.0);
    scene._sizeSpline.AddPoint(0.5, 5.0);
    scene._sizeSpline.AddPoint(1.0, 1.0);

    document.addEventListener('keyup', (e) => scene._onKeyUp(e), false);
  
    scene._UpdateGeometry();
  }

  _onKeyUp(event) {
    switch(event.keyCode) {
      case 32: // SPACE
        scene._AddParticles();
        break;
    }
  }

  _AddParticles(timeElapsed) {
    if (!scene.gdfsghk) {
      scene.gdfsghk = 0.0;
    }
    scene.gdfsghk += timeElapsed;
    const n = Math.floor(scene.gdfsghk * 75.0);
    scene.gdfsghk -= n / 75.0;

    for (let i = 0; i < n; i++) {
      const life = (Math.random() * 0.75 + 0.25) * 10.0;
      scene._particles.push({
          position: new THREE.Vector3(
              (Math.random() * 2 - 1) * 1.0,
              (Math.random() * 2 - 1) * 1.0,
              (Math.random() * 2 - 1) * 1.0),
          size: (Math.random() * 0.5 + 0.5) * 4.0,
          colour: new THREE.Color(),
          alpha: 1.0,
          life: life,
          maxLife: life,
          rotation: Math.random() * 2.0 * Math.PI,
          velocity: new THREE.Vector3(0, -15, 0),
      });
    }
  }

  _UpdateGeometry() {
    const positions = [];
    const sizes = [];
    const colours = [];
    const angles = [];

    for (let p of scene._particles) {
      positions.push(p.position.x, p.position.y, p.position.z);
      colours.push(p.colour.r, p.colour.g, p.colour.b, p.alpha);
      sizes.push(p.currentSize);
      angles.push(p.rotation);
    }

    scene._geometry.setAttribute(
        'position', new THREE.Float32BufferAttribute(positions, 3));
    scene._geometry.setAttribute(
        'size', new THREE.Float32BufferAttribute(sizes, 1));
    scene._geometry.setAttribute(
        'colour', new THREE.Float32BufferAttribute(colours, 4));
    scene._geometry.setAttribute(
        'angle', new THREE.Float32BufferAttribute(angles, 1));
  
    scene._geometry.attributes.position.needsUpdate = true;
    scene._geometry.attributes.size.needsUpdate = true;
    scene._geometry.attributes.colour.needsUpdate = true;
    scene._geometry.attributes.angle.needsUpdate = true;
  }

  _UpdateParticles(timeElapsed) {
    for (let p of scene._particles) {
      p.life -= timeElapsed;
    }

    scene._particles = scene._particles.filter(p => {
      return p.life > 0.0;
    });

    for (let p of scene._particles) {
      const t = 1.0 - p.life / p.maxLife;

      p.rotation += timeElapsed * 0.5;
      p.alpha = scene._alphaSpline.Get(t);
      p.currentSize = p.size * scene._sizeSpline.Get(t);
      p.colour.copy(scene._colourSpline.Get(t));

      p.position.add(p.velocity.clone().multiplyScalar(timeElapsed));

      const drag = p.velocity.clone();
      drag.multiplyScalar(timeElapsed * 0.1);
      drag.x = Math.sign(p.velocity.x) * Math.min(Math.abs(drag.x), Math.abs(p.velocity.x));
      drag.y = Math.sign(p.velocity.y) * Math.min(Math.abs(drag.y), Math.abs(p.velocity.y));
      drag.z = Math.sign(p.velocity.z) * Math.min(Math.abs(drag.z), Math.abs(p.velocity.z));
      p.velocity.sub(drag);
    }

    scene._particles.sort((a, b) => {
      const d1 = scene._camera.position.distanceTo(a.position);
      const d2 = scene._camera.position.distanceTo(b.position);

      if (d1 > d2) {
        return -1;
      }

      if (d1 < d2) {
        return 1;
      }

      return 0;
    });
  }

  Step(timeElapsed) {
    scene._AddParticles(timeElapsed);
    scene._UpdateParticles(timeElapsed);
    scene._UpdateGeometry();
  }
}

class ParticleSystemDemo {
  constructor() {
    scene._Initialize();
  }

  _Initialize() {
    scene._threejs = new THREE.WebGLRenderer({
      antialias: true,
    });
    scene._threejs.shadowMap.enabled = true;
    scene._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    scene._threejs.setPixelRatio(window.devicePixelRatio);
    scene._threejs.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(scene._threejs.domElement);

    window.addEventListener('resize', () => {
      scene._OnWindowResize();
    }, false);

    const fov = 60;
    const aspect = 1920 / 1080;
    const near = 1.0;
    const far = 1000.0;
    scene._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    scene._camera.position.set(25, 10, 0);

    scene._scene = new THREE.Scene();

    let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(20, 100, 10);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.left = 100;
    light.shadow.camera.right = -100;
    light.shadow.camera.top = 100;
    light.shadow.camera.bottom = -100;
    scene._scene.add(light);

    light = new THREE.AmbientLight(0x101010);
    scene._scene.add(light);

    const controls = new OrbitControls(
      scene._camera, scene._threejs.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
        './utils/sun.jpg',
        './utils/sun.jpg',
        './utils/sun.jpg',
        './utils/sun.jpg',
        './utils/sun.jpg',
        './utils/sun.jpg',
    ]);
    scene._scene.background = texture;

    scene._particles = new ParticleSystem({
        parent: scene._scene,
        camera: scene._camera,
    });

    scene._LoadModel();

    scene._previousRAF = null;
    scene._RAF();
  }

  _LoadModel() {
    const loader = new GLTFLoader();
    loader.load('./resources/rocket/Rocket_Ship_01.gltf', (gltf) => {
      gltf.scene.traverse(c => {
        c.castShadow = true;
      });
      scene._scene.add(gltf.scene);
    });
  }

  _OnWindowResize() {
    scene._camera.aspect = window.innerWidth / window.innerHeight;
    scene._camera.updateProjectionMatrix();
    scene._threejs.setSize(window.innerWidth, window.innerHeight);
  }

  _RAF() {
    requestAnimationFrame((t) => {
      if (scene._previousRAF === null) {
        scene._previousRAF = t;
      }

      scene._RAF();

      scene._threejs.render(scene._scene, scene._camera);
      scene._Step(t - scene._previousRAF);
      scene._previousRAF = t;
    });
  }

  _Step(timeElapsed) {
    const timeElapsedS = timeElapsed * 0.001;

    scene._particles.Step(timeElapsedS);
  }
}


let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new ParticleSystemDemo();
});


*/





















//random object at click

const mouse=new THREE.Vector2();
const inters=new THREE.Vector3();
const planeNormal=new THREE.Vector3();
const plane=new THREE.Plane();
const rayc=new THREE.Raycaster();
window.addEventListener('mousemove',function(e){
  mouse.x=(e.clientX/ window.innerWidth)*2-1;
  mouse.x=(e.clientX/ window.innerHeight)*2+1;
  planeNormal.copy(camera.position).normalize();
  plane.setFromNormalAndCoplanarPoint(planeNormal,scene.position);
  rayc.setFromCamera(mouse,camera);
  rayc.ray.intersectPlane(plane,inters);
})


window.addEventListener('click',function(e){
  const s= new THREE.SphereGeometry(0.125,30,30);
  const sm= new THREE.MeshStandardMaterial({
    color:0xFFEA00,
    metalness:0,
    roughness:0
  });
const sph=new THREE.Mesh(s,sm);
scene.add(sph);
sph.position.copy(inters);
})























