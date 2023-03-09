import {loadGLTF} from "../../libs/loader.js";
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

    anchor.onTargetFound = () => {
      console.log("on target found"); //debug statements for event handlers through anchors
    }
    anchor.onTargetLost = () => {
      console.log("on target lost");
    }

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
  /*Event Handling
  
  Very often, we would like to capture the moment when the image target is detected or
  when it is lost. You can for example, stop playing the animation only when the 3D
  content appears and stop it and reset everything when the contents disappear.

  MIND-AR exposes two very important callback events that handle this. 
  These handlers are independen t across different anchors. If you create multiple targets
  you can create a separate set of callbacks for each of them.
  */
});
