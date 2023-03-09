import { CSS3DObject } from '../../libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js';
const THREE = window.MINDAR.IMAGE.THREE;

/* This piece of code mostly comes from the youtube player API documentation 
page but I tweak it a bit and wrap it up into a promise that resolve a yt dot
player object. So using the player API instead of using a simple iframe has a
lot of benefits though it allows you to have better control over the life cycle
of the video for example: =============> */ 
const createYoutube = () => {
  return new Promise((resolve, reject) => {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    const onYouTubeIframeAPIReady = () => {
      const player = new YT.Player('player', {
	videoId: 'M7lc1UVf-VE',
	events: {
	  onReady: () => {
	    resolve(player);
	  }
	}
      });
    }
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const player = await createYoutube();

    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: '../../assets/targets/course-banner.mind',
    });
    const {renderer, cssRenderer, scene, cssScene, camera} = mindarThree;

    const obj = new CSS3DObject(document.querySelector("#ar-div"));
    const cssAnchor = mindarThree.addCSSAnchor(0);
    cssAnchor.group.add(obj);

    /* ======> I can programmatically start the 
    player when the target is being detected and.. */
    cssAnchor.onTargetFound = () => {
      player.playVideo();
    }
    /* ..pause it when the target is lost */
    cssAnchor.onTargetLost = () => {
      player.pauseVideo();
    }

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      cssRenderer.render(cssScene, camera);
    });
  }
  start();
});
