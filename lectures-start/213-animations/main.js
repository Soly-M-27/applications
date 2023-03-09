import {loadGLTF} from "../../libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body, 
      imageTargetSrc: '../../assets/targets/musicband.mind',
    });
    const {renderer, scene, camera} = mindarThree;
    
    $("h1").css("color", "red"); //jQuery works as intended this way.

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

    const gltf = await loadGLTF('../../assets/models/musicband-raccoon/scene.gltf');
    gltf.scene.scale.set(0.1, 0.1, 0.1);
    gltf.scene.position.set(0, -0.4, 0);

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(gltf.scene);

    //gltf.animations - This is a list of animations
    const mixer = new THREE.AnimationMixer(gltf.scene); //Pass in the model (gltf.scene) to the AnimationMixer class
    const action = mixer.clipAction(gltf.animations[0]);
    action.play();
    /*Nothing will be animated at this time due to how the mixer is being called atm. You have to 
    call mixer.update in every frame and it requires an extra input, such as the elapsed time since last update
    so the the mixer will know how much to move forward in animation timeline.*/
    
    /*So create a clock to help manage the time*/
    const clock = new THREE.Clock();

    /*And create a delta variable inside the render loop where delta is time elapsed since the 
    last time we called the get mixer function*/
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      gltf.scene.rotation.set(0, gltf.scene.rotation.y + delta, 0);
      mixer.update(delta);
      renderer.render(scene, camera);
    });
  }
  start();

  /*There are two ways to animate a 3D model:
    - The first one is intrinsic to the model itself, meaning that 3d models
    themselves contain animations when they are being built by 3D artists. In GLTF format,
    these animations are already embedded within the GLTF file so they are loaded together with
    the model. More specifically, they are imported into the gltf.animations property.
    
    To play with these animation, we can use the THREE.js AnimationMixer class.
    A 3D model can contain multiple animations, which is why glft.animations is passed as
    a list with its corresponding index.
    
    - Another way to animate 3D contents is extrinsic to the model. Basically, it means we will
    write external code to alter the properties of the model continuosly for every frame. Since
    we have to do an update per every frame, we also put these pieces of code inside the render loop.
    
    There are many properties to play with other than rotation, including but not limited to:
    position,
    scale,
    opacity.
    
    A lot of interesting effects can be done even if you don't have the control of the
    animations themselves.*/
}); 
