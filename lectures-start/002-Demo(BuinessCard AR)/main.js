/* Business Card First Demo in Mind-AR */
import { loadGLTF } from "../../libs/loader.js"; // GLTF loader in library
const THREE = window.MINDAR.IMAGE.THREE; // MIND-AR

// Fetching html document.body
document.addEventListener('DOMContentLoaded', () => {
    const start = async() => { // Needed for await functions
        // Instantiate Mind-AR obj
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: '../../assets/targets/card.mind',
        });

        //Check if browser is open on desktop or touch device.
       /* const result = document.getElementById("result");
        const isTouchDevice = () => {
            try { //Checks if it's touch
                document.createEvent("TouchEvent");
                result.innerHTML = "<span>Touch</span> on AR icons";
            }
            catch(e) { //Results in desktop mode
                result.innerHTML = "<span>Click</span> on AR icons";
            }
        };*/

        // Create scene, renderer and camera for html page
        const {renderer, scene, camera} = mindarThree;
    
        // Add Light to Scene.
        const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1);
        scene.add(light);

        // Add 3D asset to scene and resize accordingly
        const card3D = await loadGLTF('../../assets/models/musicband-raccoon/scene.gltf');
        card3D.scene.scale.set(0.06, 0.06, 0.06);
        card3D.scene.position.set(-0.3, 0.09, -0.2);
        
        /* Add anchor to scene to attach 3D asset at 
           appropriate distance from the scene to display 
           on the scene. */
        const anchor = mindarThree.addAnchor(0);
        anchor.group.add(card3D.scene);

        // Get 3D asset animations if any via list
        const mixer = new THREE.AnimationMixer(card3D.scene);
        const action = mixer.clipAction(card3D.animations[0]);
        action.play();

        /* mixer.update needs to be updated every frame and it requires an extra input, 
        such as the elapsed time since last updated. This will let the mixer know how much
        to move forward in the animation timeline. */
        const clock = new THREE.Clock();
          
        /* Start MINDAR Engine. We want to wait till it's ready. */
        await mindarThree.start();
        /* Since the scene/html is now ready, set up render loop like any other THREE.js app.
          This callback function will execute for every frame. */
          renderer.setAnimationLoop(() => {
            /* Added a delta variable inside the render loop. 
               Delta is time elapsed since the last time we 
               called the get mixer function. */
               const delta = clock.getDelta();
               /* To cause 3D object to rotate: */
               card3D.scene.rotation.set(0, card3D.scene.rotation.y + delta, 0);
               mixer.update(delta);
               renderer.render(scene, camera);
          });
    }
start();
})