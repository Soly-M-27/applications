import {loadGLTF, loadVideo} from "../../libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  /*Sometimes you may want to get assets ready but not to start the AR effect*/
  /*Remove video outside of function scope*/
  let video = null;
  const init = async() => {
    const video = await loadVideo("../../assets/videos/sintel/sintel.mp4");
    video.play();
    video.pause();
  }
  /*If we do this we will be able to play the video programmatically later on without any user
  interactions. But of course, this init function has to be called upon user interactions.
  
  So one natural application flow is to show a confirmation screen to the users you can say
  something like this is an AR effect, please enable camera access. As long as the user clicks that
  then you can load up all the video and audios and apply this trick here.

  The exact implementation will depend on your application flow but it's important that you are
  aware of these browser limitations and know what you need to do to get around that.
  */

  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: '../../assets/targets/sintel.mind',
    });
    const {renderer, scene, camera} = mindarThree;

    const video = await loadVideo("../../assets/videos/sintel/sintel.mp4");
    const texture = new THREE.VideoTexture(video);

    const geometry = new THREE.PlaneGeometry(1, 204/480);
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
    video.addEventListener( 'play', () => {
      video.currentTime = 6;
    });

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  //start();
  /*iOS browsers, Mac are a problem!
    Safari browsers forbid video and audio from playing automatically 
    without user interactions. This is the video example we worked on earlier
    as you can see we trigger the start function automatically in the DomContentLoaded 
    callback without any user interactions. One quick fix is that instead of calling 
    the function right away we create a button and trigger that function when button
    is being clicked. For example we can do something like this: */
    const button = document.createElement("button");
    /*Give it a text start and then add a event listener*/
    button.textContent = "Start";
    /*Then trigger the start function*/
    button.addEventListener("click", start);
    /*Attach button to body*/
    document.body.appendChild(button);

    /*Unlike 230-video dir, this one manages to access
    and play the video just fine by adding that extra async function*/
});
