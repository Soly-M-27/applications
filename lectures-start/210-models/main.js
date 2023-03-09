/*Import GLFTLoader explicitely*/
//import {GLTFLoader} from '../../libs/three.js-r132/examples/jsm/loaders/GLTFLoader.js'

const THREE = window.MINDAR.IMAGE.THREE;

/*Import Utility Library. If this import is in then import {GLFTLoader} is no loner necessary.
const loadGLTF will also be removed since {loadGLFT} can take care of it all*/
import {loadGLTF} from "../../libs/loader.js";
/*
const loadGLTF = (path) => { //Create a helper function called loadGLTF which take the model path as input
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader(); //Do actual load inside Promise method
    loader.load(path, (gltf) => { //Load path of obj to scene
      resolve(gltf); // Resolve the Promise when the model is ready
    });
  });
}
*/

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: '../../assets/targets/musicband.mind',
    });
    const {renderer, scene, camera} = mindarThree;

    /*Create light for the scene. Instantantiate it*/
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light); /*Add new light variable as parameter to enter to scene*/

    const anchor = mindarThree.addAnchor(0);

    /*In the main application do: */
    const gltf = await loadGLTF('../../assets/models/musicband-raccoon/scene.gltf');
    gltf.scene.scale.set(0.1, 0.1, 0.1);
    gltf.scene.position.set(0, -0.4, 0);
    anchor.group.add(gltf.scene); /*This is done this way because scene
     contains the light source necessary to give to the 3D object.*/

    /*
    //To Load a 3D object based on image recognition
    //Instantiate Loader
    const loader = new GLTFLoader();
    //Call the load method with the path of our 3D model
    loader.load('../../assets/models/musicband-raccoon/scene.gltf', (gltf) => { //This will be replaced by Promise to manage multiple object
      //Rescale model
      gltf.scene.scale.set(0.1, 0.1, 0.1); //number designed by trial and error
      gltf.scene.position.set(0, -0.4, 0); //The model itself is not normalized nor positioned at the center
      // You can consider this the 3D model to be added to the scene. THREEjs Group elemet
      anchor.group.add(gltf.scene);
    });
    */

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});
