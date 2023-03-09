import {loadAudio, loadGLTF} from "../../libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: '../../assets/targets/musicband.mind',
    }); 
    const {renderer, scene, camera} = mindarThree;

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

    const raccoon = await loadGLTF('../../assets/models/musicband-raccoon/scene.gltf');
    raccoon.scene.scale.set(0.1, 0.1, 0.1);
    raccoon.scene.position.set(0, -0.4, 0);

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(raccoon.scene);

    const audioClip = await loadAudio('../../assets/sounds/musicband-background.mp3');

    const listener = new THREE.AudioListener();
    const audio = new THREE.PositionalAudio(listener); 
    /*instead of SimpleAudio, we use Positional Audio because you can make the sound seem like
    it is coming out from a certain object. This can be a very interesting AR effect. To complete
    this process you will need to add the audio to the group anchor. Similarly you need to add the 
    listener object to the camera.*/
    camera.add(listener);
    anchor.group.add(audio);
    /*The id*/

    audio.setRefDistance(100); //Try out different options for this based on each model example. How laud sounds will be in the AR scene.

    anchor.onTargetFound = () => {
      console.log();
    }
    anchor.onTargetLost = () => {
      console.log();
    }

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
  /* Three.js has audio files library to rely on. First, we load audio file using 
  three.js AudioLoader Class. The APi of AudioLoader is very similar to GLTFLoader.
  Similar helper function using Promise instead of Callback has been created. If you
  check out loader.js file, you will find the function loadAudio. 
  
  Once the loadAudio is imported, you will create the variable that contains the address of
  out audio clip. To be able to play and hear the audio you'll need an audio listener and the postion
  of where the audio will come from. */
});
