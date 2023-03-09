import {mockWithVideo} from "../../libs/camera-mock.js";
import {loadGLTF, loadVideo} from "../../libs/loader.js";
import {createChromaMaterial} from "../../libs/chroma-video.js"; /*Import this function*/

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    mockWithVideo('../../assets/mock-videos/course-banner1.mp4');
    
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: '../../assets/targets/course-banner.mind',
    });
    const {renderer, scene, camera} = mindarThree;

    const video = await loadVideo("../../assets/videos/guitar-player.mp4");
    const texture = new THREE.VideoTexture(video);

    const geometry = new THREE.PlaneGeometry(1, 1080/1920);
    /*When we create a mesh basic material here it is already using some kind of default shader.
      The default shader is simple in sense that we are more or less just put everything that is 
      in the texture into the output canvas. The idea of green screen removal is that whenever we
      encounter a pixel that is green or close enough to green we will make that pixel transparent.
      To do that we will need to write a custom shader program instead of using the standard one
      
      Unfortunately shade programs are written with a special language called GLSL instead of
      javascript. Shader programming could be a totally standalone course by itself and is way
      beyond the scope of this course so i'll just give you a function to use directly.
      
      In the course material inside the library folder you'll find the file named chroma video.j,
      which contains a function create chroma material material so...
      */

    /*Instead of creating a MeshBasicMaterial we'll create the material with the imported function
    which check the texture as the first parameter and chroma key is the second parameter.
    Chroma key is just a color that we are going to treat as transparent. You can use whatever
    color you want for whatever bluescreen, redcreen removal, whatever you want. 
    */
    //const material = new THREE.MeshBasicMaterial({map: texture});
    const material = createChromaMaterial(texture, 0x00ff00);

    /*This time I don't want to have the video overlay on the target image instead I want to align
      it perpendicular to the target in order to make it look like the guitarist is standing upright
      on the target.*/
    const plane = new THREE.Mesh(geometry, material);
    /*{To do that I will rotate the plane along the x-axis by 90 degrees so {plane dot,
      rotation dot, x equals to math dot, pi over 2}*/
    plane.rotation.x = Math.PI / 2;
    /*{Then i'll adjust the position and scale a little bit and the position dot, y equals 0.7}.*/
    plane.position.y = 0.3;
    /*{And finally, add a scale dot multiply scalar four}*/
    plane.scale.multiplyScalar(4);

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(plane);

    anchor.onTargetFound = () => {
      video.play();
    }
    anchor.onTargetLost = () => {
      video.pause();
    }

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
  /*Unfortunately removing the green screen is not a very straightforward
    task. at least there is no simple config to do that. We need to go deeper
    down into the rendering pipeline. More specifically it involves something
    we call shaders shader is a very big topic but for simplicity:
    
    {Shaders dictate how the objects are being rendered to the camera or
    output canvas.}*/
    
});
