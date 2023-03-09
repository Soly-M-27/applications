import { CSS3DObject } from '../../libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js'; 
/*This import, this CSS3DObject is not part of the THREE.js core api so we will have to import 
it explicitly*/
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: '../../assets/targets/course-banner.mind',
    });
    /* Mind-AR creates a separate scene and renderer for handling this 
    kind of css contents and they are called cssRenderer and cssScene.*/
    const {renderer, cssRenderer, scene, cssScene, camera} = mindarThree;

    /* We can then use this css 3d object to wrap up an html element and 
    turn it into a 3js object. */
    const obj = new CSS3DObject(document.querySelector("#ar-div"));
    const cssAnchor = mindarThree.addCSSAnchor(0); //Anchors will have CSS property for these cases
    cssAnchor.group.add(obj);

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      cssRenderer.render(cssScene, camera);
    });
  }
  start();
});
