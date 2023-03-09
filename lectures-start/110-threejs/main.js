import * as THREE from '../../libs/three.js-r132/build/three.module.js';

    /**************************************************************************
    {Instructor: HiuKim Yuen}
    
    {Kim is graduated in McGill University Computer Science, 
    specialized in Machine Learning. He is also a ex-google software engineer.
    In recent years, he has devoted his time mainly on web based augmented 
    reality.
    He is a major contributor in the open source web AR community, including 
    AR.js and MindAR.}
    ***************************************************************************/

console.log("THREE", THREE); //test

/*Normally, we would like to execute javascript code after the html
has finished loading. Add an event listener for this*/
document.addEventListener("DOMContentLoaded", () => {
    /*Like a film director, you have to create a scene object*/
    const scene = new THREE.Scene();

    /*Create objects*/
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({color: "#0000FF"});
    /*If you have no prior background of 3D elements, for simplicity you can just
    assume that 3D objects are presented at Mesh. Mesh is composed of two things,
    the definition of the physicality of the obejcts (this case being one unit of 
    width, height and depth) and another being the definition of the observable
    properties of said object like: color, texture, shine, etc. (this case just
    being plain blue)*/
    const cube = new THREE.Mesh(geometry, material);

    /*Add cube to the scene*/
    scene.add(cube);
    /*Reposition the cube by setting its position property. At default it'll be
    at the center (0, 0, 0)*/
    cube.position.set(0, 0, -2);
    cube.rotation.set(0, Math.PI/4, 0); /*Math.PI/4 = 45 degrees rotation on the Y axis*/

    /*Another important elements as a film director is the camera so create it*/
    const camera = new THREE.PerspectiveCamera();
    camera.position.set(1, 1, 5);

    /*The scene is ready so now we want to render it
    Where would it be rendering to?
        In WebGL we use canvas elements to display rendered graphics.
        When we create a renderer with WebGLRenderer, we have also created a canvas
        element with it. When we call render, that canvas element will update*/
    const renderer = new THREE.WebGLRenderer({alpha: true}); /*parameter to render canvas transparent*/
    renderer.setSize(500, 500);
    renderer.render(scene, camera); /*Summon 3D graphic with scene cam*/

    /*Start the device camera and place it underneath the canvas to give it its AR/VR element*/
    const video = document.createElement("video");
    navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
        video.srcObject = stream; /*assign stream to video source object*/
        video.play(); /*Play the video*/
    }); /*Starts the webcam*/
    
    /*Set the css positional values to absolute*/
    video.style.position = "absolute";
    /*Set video dimensions to canvas size*/
    video.style.width = renderer.domElement.width;
    video.style.height = renderer.domElement.height;
    renderer.domElement.style.position = "absolute";

    /*Attach video to HTML body as well*/
    document.body.appendChild(video);
    /*Attach renderer to appendChild to send 3D object to HTML file*/
    document.body.appendChild(renderer.domElement);

    /*Assume you have some AR Engine and when we first instantiate it
    we would then call a method to take video as input and the method
    will estimate the position and rotation and update the camera accordingly.
    We would like to repeat this process continuosly, ideally for every video 
    frame but not more. */
    const ar = new SOME_AR_ENGINE(); /*Later we will replace this with a real one*/
    /*repeated process of position and rotation estimation from video input continuosly idealy for every single frame but not more*/
    while (true) { 
        await nextVideoFrameReady(); /*To idealy process every vidoe frame*/
        const {position, rotation} = ar.computeObjectPose(video); /*Takes video as input and estimates the pose of the camera and return the estimated position and rotation*/
        cube.position = position;
        cube.rotation = rotation;
    }

    /*An AR Library does only one thing. It estimates the pose of the virtual camera according to what you
    want to track. The Library can do more than that but that's the main idea*/


});