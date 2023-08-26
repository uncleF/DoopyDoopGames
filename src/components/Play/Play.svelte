<script lang="ts">
  import { browser } from '$app/environment';
  import shared from 'data/shared.json'
  import { toggleFullscreen, transformNameToClassNameComponent } from 'utilities/helpers';

  export let slug: ProjectSlug
  export let name: ProjectName;

  function onClick() {
    toggleFullscreen();
  }

  const src = `/${slug}/play/webgl/index_web.html`
  const className = `${transformNameToClassNameComponent(name)}Play`;
  const isEnabled = browser && document.documentElement.requestFullscreen;
  let isFullscreen = browser && document.fullscreenElement;
</script>

<section class={className}>
  <iframe 
    {src}
    { ...shared.webGLFrameSize }
    title={name}
    class="playFrame"
    frameborder="0"
    allow="fullscreen"></iframe>
  <button
    on:click={onClick}
    class="fullscreenToggle"
    class:fullscreenToggle-is-on={isFullscreen}
    class:fullscreenToggle-is-enabled={isEnabled}>
      Toggle Fullscreen
  </button>
</section>