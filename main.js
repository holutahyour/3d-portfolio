import "./style.css";

import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new Three.Scene();

const camera = new Three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new Three.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new Three.TorusGeometry(10, 3, 16, 100);
const material = new Three.MeshStandardMaterial({
  color: 0xff6347,
});

const torus = new Three.Mesh(geometry, material);

scene.add(torus);

const pointLight = new Three.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new Three.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

const lightHelper = new Three.PointLightHelper(pointLight);
const gridHelper = new Three.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStars() {
  const geometry = new Three.CircleGeometry(0.25, 24, 24);
  const material = new Three.MeshStandardMaterial({ color: 0xffffff });
  const star = new Three.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => Three.MathUtils.randFloatSpread(100));
    
    star.position.set(x,y,z);
    scene.add(star)
}

Array(200).fill().forEach(addStars)

const spaceTexture = new Three.TextureLoader().load('/galaxy.jpg');
scene.background = spaceTexture;

const avatarTexture = new Three.TextureLoader().load('/holutahyour.png');
const avatar = new Three.Mesh(
  new Three.BoxGeometry(3,3,3),
  new Three.MeshBasicMaterial({map: avatarTexture})
)

avatar.position.z = 10
avatar.position.x = 10

scene.add(avatar);

const moonTexture = new Three.TextureLoader().load('moon.jpg')

const moon = new Three.Mesh(
  new Three.SphereGeometry(3,32,32),
  new Three.MeshStandardMaterial({
    map: moonTexture
  })
)

moon.position.z = 30;
moon.position.x = -10;

scene.add(moon);

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.1;

  controls.update();

  renderer.render(scene, camera);
}

animate();
