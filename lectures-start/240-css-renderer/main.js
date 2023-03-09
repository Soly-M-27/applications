/*First things first, we need to import a class called css 3d object from the 3.js
  libraries.*/
import {CSS3DObject} from "../../libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js";

/*This css 3d object is not part of the 3js core API so we will have to import it explicitly.*/
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: '../../assets/targets/course-banner.mind',
    });
    /*Mind-AR creates a separate scene and renderer for handling this kind of css contents.
    and they are called cssRenderer and cssScene.*/
    const {renderer, cssRenderer, scene, cssScene, camera} = mindarThree;

    /*We can then use this css 3D object to wrap up an html element and turn it into a 3.js object.
    Pass in the dom element which is the #ar-div id into this obj const variable using the imported
    function from CSS3DRenderer.js to render said obj to the webpage*/
    const obj = new CSS3DObject(document.querySelector("#ar-div"));
    /*Create anchor from Mind-AR.3 obj like before*/
    const cssAnchor = mindarThree.addCSSAnchor(0); //Add the CSS to the anchor callback here for this case only
    cssAnchor.group.add(obj);

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      /*Finally, instead of calling renderer.render we'll do cssRenderer.render and then css scene
      instead of scene*/
      cssRenderer.render(cssScene, camera);
    });
  }
  start();
  /*3js comes with the ability to render regular html and css elements
    already and MindAR library has built-in support for this feature.*/
});
