import {loadGLTF} from "../../libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: '../../assets/targets/bee.mind',
    });
    const {renderer, scene, camera} = mindarThree;

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

    const ham = await loadGLTF('../../assets/models/pixelpc_sm/YouTubeLogoPixel_SM.glb');
    ham.scene.scale.set(0.01, 0.01, 0.01);
    ham.scene.position.set(0, -0.4, 0);    

    const hamAnchor = mindarThree.addAnchor(0); //Index 0
    hamAnchor.group.add(ham.scene);

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
  /*This JS script will serve to test the best formatting for .glb/.gltf 
  3D assets for image targets. It will also check if .mind image targets 
  track well.*/
});