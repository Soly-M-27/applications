import {loadGLTF, loadAudio} from "../../libs/loader.js";
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
    
    /*Flag. Do for all models where you want to catch an event*/
    raccoon.scene.userData.clickable = true; 

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(raccoon.scene);

    const listener = new THREE.AudioListener();
    camera.add(listener); //Example to sample effect of event handling
    /*Add short audio clip and play it when the raccoon is being clicked*/
    const audioClip = await loadAudio("../../assets/sounds/musicband-drum-set.mp3"); //Load audio clip
    const audio = new THREE.Audio(listener); //This is the audio object
    audio.setBuffer(audioClip); //Assign audio clip to audio buffer

    /*This event callback contains the X and Y coordinates of the click 
    location as in: e.clientX and e.clientY. 
    The value of clientX ranges from 0 to the width of the container. 
    Similarly for clientY, the first thing we want to do is normalize 
    these coordinates. 
    Most specifically, we want the values to go from -1 to 1 instead.*/
    document.body.addEventListener("click", (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      
      /*Because Y axis is inverted here from top to bottom,
      -1 will be multiplied to reverse the Y coordinate to go from 
      bottom to top.*/
      const mouseY = -1 * ((e.clientY / window.innerHeight) * 2 - 1); 
     
      /*Combine the two to calculate wether the user is clicking on the
      object we are interested in*/
      const mouse = new THREE.Vector2(mouseX, mouseY); 
      

      const raycaster = new THREE.Raycaster(); 
      /*Fire a virtual ray from the camera to point on the mouse track 
      position on screen and beyond and check on the screen if this 
      intersects with any objects on the way.*/
      
      raycaster.setFromCamera(mouse, camera); 
      /*Set raycaster with mouse and camera. Mouse track position in a
      normalized scalre (-1 to 1).*/

      const intersects = raycaster.intersectObjects(scene.children, true); 
      /*First parameter are the list of objs we're interested in.
      Check multiply objects at the same time by passing scene.children. 
      The second paramere is wether we should check recursively for all 
      the descendents

      {intersects will now be a list of intersects as intersectObjects 
      is a method to return said intersects.}

      The returned list of intersect objects are sorted by their 
      distances from the camera. We are interested in the closest one
      amongst those which is intersect[0].object.*/

      if (intersects.length > 0) { /*{to make sure it intersects with 
                                   at least one object then we wrap 
                                   it up in this if statement}*/
        let o = intersects[0].object; /*{Obj "o" could just be a descendant
                                      sub obj of the racoon so we can 
                                      now simply check if "o" equals 
                                      racoon.scene, which most likely will
                                      returns false althought it might
                                      intersect with the model}*/

  /*What we need to do instead is to recursively go up the hierarchy
  through the parent and check wether any of them are indeed the racoon.*/
	while (o.parent && !o.userData.clickable) { //{Break when I have reached 
                                              //an obj that is clickable
                                              //
    if (o === raccoon.scene) break;
	  o = o.parent;
	}

	if (o.userData.clickable) { //Double check outside the loop if 
                              //you have reached an obj
    /*This is where "o" is being checked on wether it is a sub object of
    the racoon but it will most likely return false. Although, it may
    intersect with the model so it must be checked and this way we can
    get closer to reaching the closest distance we wish to access from
    the camera */
	  if (o === raccoon.scene) { //Test which model it is
      /*This is basically how we capture click or touch events
      on objects.*/
	    audio.play(); //Play audio object after 3D object is clicked
	  }
    /*This is how we capture events*/
	}
      }
    });

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});
