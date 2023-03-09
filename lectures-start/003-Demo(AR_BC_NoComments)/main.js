import { loadGLTF } from "../../libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
    const start = async() => {
        const mindarThree = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: '../../assets/targets/card.mind',
        });

        const {renderer, scene, camera} = mindarThree;
    
        const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1);
        scene.add(light);

        const anchor = mindarThree.addAnchor(0);

        const Asset3D = await loadGLTF('../../assets/models/musicband-raccoon/scene.gltf');
        Asset3D.scene.scale.set(0.1, 0.1, 0.1);
        Asset3D.scene.position.set(0, -0.4, 0);
        anchor.group.add(Asset3D.scene);

        const mixer = new THREE.AnimationMixer(Asset3D.scene);
        const action = mixer.clipAction(Asset3D.animations[0]);
        action.play();
        
        const clock = new THREE.Clock();
          
        await mindarThree.start();
          renderer.setAnimationLoop(() => {
               const delta = clock.getDelta();
               Asset3D.scene.rotation.set(0, Asset3D.scene.rotation.y + delta, 0);
               mixer.update(delta);
               renderer.render(scene, camera);
          });
    }
start();
});