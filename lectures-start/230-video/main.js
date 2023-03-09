import {loadGLTF, loadVideo} from "../../libs/loader.js"; //import helper function loadVideo 
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: '../../assets/targets/sintel.mind',
    });
    const {renderer, scene, camera} = mindarThree;

    const video = await loadVideo("../../assets/videos/sintel/sintel.mp4"); //to load video in proper html5 format
    
    /*Create video texture to attach a texture that'll have the video as its texture*/
    const texture = new THREE.VideoTexture(video);

    /*create a plane in 3js*/
    const geometry = new THREE.PlaneGeometry(1, 204/480); //PlaneGeometry parameters: (height, width) of geometrical plane. //The video is 480 * 204 is aspect raio. Divive 240 / 480 (this is the height) to fit video according to the square mesh.
    const material = new THREE.MeshBasicMaterial({map: texture});
    const plane = new THREE.Mesh(geometry, material);
    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(plane);
    
    anchor.onTargetFound = () => {
      video.play();
    }
    anchor.onTargetLost = () => {
      video.pause();
    }
    video.addEventListener("play", () => {
      video.currentTime = 6; //start playing video at 6 second
      /*Here we turn a static image into a video*/
    })

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();

    /*In Mind-AR, one unit of length is equal to 
    the width of the target image in the AR scene.
    Therefore, when we create the plane geometry with 
    one unit of width here, this plane will be of the 
    same width as the target image. We set the height 
    to 1 as well in order to create a square. However,
    our video is not a square it has a different aspect
    ratio. for the video we are using here the dimension 
    is 480 times 204. Therefore, we have to change the height
    to 204 over 480 to keep the aspect ratio*/
});
