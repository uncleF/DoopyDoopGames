<script lang="ts">
  import { browser } from '$app/environment';
  import { toggleFullscreen } from 'utilities/helpers';

  function onClick() {
    toggleFullscreen();
  }

  const isEnabled = browser && document.documentElement.requestFullscreen;
  let isFullscreen = browser && document.fullscreenElement;
</script>  
  
<button
  on:click={onClick}
  class="fullscreenToggle"
  class:fullscreenToggle-is-on={isFullscreen}
  class:fullscreenToggle-is-enabled={isEnabled}>
    Toggle Fullscreen
</button>