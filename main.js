import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import sunpng from "../Assets/2k_sun.jpg";
import earthpng from "../Assets/2k_earth_daymap.jpg";
import nearthpng from "../Assets/2k_earth_normal_map.jpg";
import jupiterpng from "../Assets/2k_jupiter.jpg";
import marspng from "../Assets/2k_mars.jpg";
import venuspng from "../Assets/2k_venus_atmosphere.jpg";
//setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, innerHeight);
camera.position.setZ(30);
//light yagami KEKw😂
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);
//texture
const sunTexture = new THREE.TextureLoader().load(sunpng);
const jupiterTexture = new THREE.TextureLoader().load(jupiterpng);
const marsTexture = new THREE.TextureLoader().load(marspng);
const venusTexture = new THREE.TextureLoader().load(venuspng);
const earthTexture = new THREE.TextureLoader().load(earthpng);
const normalEarthTexture = new THREE.TextureLoader().load(nearthpng);

//sun
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(20, 100, 200),
  new THREE.MeshBasicMaterial({
    map: sunTexture,
  })
);
sphere.position.set(0, 15, 0);
scene.add(sphere);
//venus
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(4, 100, 200),
  new THREE.MeshBasicMaterial({
    map: venusTexture,
  })
);
venus.position.set(-15, -65, 0);
scene.add(venus);
//jupiter
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(15, 100, 200),
  new THREE.MeshBasicMaterial({
    map: jupiterTexture,
  })
);
jupiter.position.set(0, -95, 0);
scene.add(jupiter);
//mars
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(8, 100, 200),
  new THREE.MeshBasicMaterial({
    map: marsTexture,
  })
);
mars.position.set(17, -45, 0);
scene.add(mars);
//earth
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(10, 100, 200),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalEarthTexture,
  })
);
earth.position.set(-17, -25, 0);
scene.add(earth);

//addstars
function addstar() {
  const star = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 10, 10),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(500));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(3000).fill().forEach(addstar);
//orbitcontrols
//const controls = new OrbitControls(camera, renderer.domElement);

//scroll
function scrollCamera() {
  const top = document.body.getBoundingClientRect().top;
  camera.position.setY(top * 0.055);
}

//animate
function animate() {
  requestAnimationFrame(animate);
  sphere.rotateY(0.0009);
  earth.rotateY(0.009);
  venus.rotateY(.009);
  mars.rotateY(0.015);
  jupiter.rotateY(0.007);
  //controls.update;
  document.body.onscroll = scrollCamera();

  renderer.render(scene, camera);
}
animate();
