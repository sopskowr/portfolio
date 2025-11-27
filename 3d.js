//Imports
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";


function create3DViewer(containerId, modelName) {

    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(10, 30, 150);

    // Mouse tracking
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let object;
    let controls;

    const loader = new GLTFLoader();

    // Load model
    loader.load(
        `./models/${modelName}/scene.gltf`,
        function (gltf) {
            object = gltf.scene;
            scene.add(object);
        },
        function (xhr) {
            console.log(Math.round((xhr.loaded / xhr.total) * 100) + "% loaded");
        },
        function (error) {
            console.error("Model error:", error);
        }
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById(containerId).appendChild(renderer.domElement);

    // Lighting
    const topLight = new THREE.DirectionalLight(0xffffff, 1);
    topLight.position.set(500, 500, 500);
    topLight.castShadow = true;
    scene.add(topLight);

    const ambientLight = new THREE.AmbientLight(0x333333, 1);
    scene.add(ambientLight);

    // mouse movement
    document.addEventListener("mousemove", function (event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    // animate
    function animate() {
        requestAnimationFrame(animate);

        if (object) {
            object.rotation.y = -3 + (mouseX / window.innerWidth) * 3;
            object.rotation.x = -1.2 + (mouseY * 2.5) / window.innerHeight;
        }

        renderer.render(scene, camera);
    }

    animate();
}
 // create viewers 
 
create3DViewer("container3D", "shelf");
create3DViewer("container3D_2", "desk");
create3DViewer("container3D_3", "chair");


