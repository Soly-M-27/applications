const THREE = window.MINDAR.IMAGE.THREE; 
/*imported MINDAR module will be attached likeso. We also need to use
threejs library and this is already part of this AR*/

document.addEventListener('DOMContentLoaded', () => {
    const start = async () => {
      /*Async function*/
      /*Instantiate a MINDAR THREE obj*/
      /*At the top level is global scope, which we refer to as 
      the Window object in the browser (Node uses different terminology).
       The next level down is module scope. When writing modular 
       JavaScript, each module (file) has it’s own module scope. 
       Finally, block and function scopes can be nested inside each 
       other to any depth.
       However, when we are in global scope, we can’t access module scope,
       and when we are in module scope, we can’t access the scope of any 
       functions contained within the module.*/ 
      const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        /*Takes two parameters: container to hold html document, 
        image target source*/
        container: document.body,
        imageTargetSrc: "../../assets/targets/course-banner.mind",
      });

      /*When Threejs was introduced, renderer, scene and camera were created 
      once the MINDAR obj is instantiated*/
      const { renderer, scene, camera } = mindarThree;
      const geometry = new THREE.PlaneGeometry(1, 1);
      const material = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        transparent: true,
        opacity: 0.5,
      });
      const plane = new THREE.Mesh(geometry, material);

      /*Create MINDAR Anchor Object*/
      const anchor = mindarThree.addAnchor(0); /*Because there is only one image at this time, there is only one image to track, hence: index 0*/
      /*When we anchor, we tell the library to track this target image and give me the estimated
      position and rotation on where I should place my object*/

      /* Add plane directly to anchor instead of directly to scene.
      The anchor will keep it tied to the image target. Adding
      plane onto scene would result in the plane simply displaying itself
      on the html page (entirely or wherever you place it based on position
      and scaling */
      anchor.group.add(plane); // THREE.Group element


      /*Lastly, start MINDAR Engine. We want to wait till it's ready. 
      Await can only be used within an asynchronous function.*/
      await mindarThree.start();

      /*Since scene is now ready, set up render loop like any other THREEjs app.
      This callback function will execute for every frame*/
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera); /*Here we render the canvas element with scene and camera*/
      });
    }
    start();

    /*3D scenes are usually represented in hirearchy. A Group is like a virtual representation of position and orientation.
    You can add it to the scene and set pos and rot like ordinary objects. However, it's empty by itself so you wont see anything
    being rendered. However, we can add other renderable objects into the Group. When we do that, the pos and rot from these objects will 
    automatically inherit from these parents Group. This Anchor group is managed by MINDAR Library, meaning that library will continuosly
    keep updating pos and rot of tracked target.*/
});
