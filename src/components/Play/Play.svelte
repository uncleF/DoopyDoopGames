<script lang="ts">
  import shared from 'data/shared.json'
  import { transformNameToClassNameComponent } from 'utilities/helpers';
  import FullscreenToggle from 'components/FullscreenToggle/FullscreenToggle.svelte';
  import PlayPlatforms from 'components/PlayPlatforms/PlayPlatforms.svelte';

  export let slug: ProjectSlug
  export let project: ProjectData;

  const { name, platforms } = project;
  const src = `/${slug}/play/webgl/index_web.html`
  const className = `${transformNameToClassNameComponent(name)}Play`;
</script>

<section class={className}>
  <iframe 
    {src}
    { ...shared.webGLFrameSize }
    title={name}
    class="playFrame"
    frameborder="0"
    allow="fullscreen"></iframe>
  <FullscreenToggle />
  {#if platforms}
    <PlayPlatforms
      {name}
      {platforms} />
  {/if}
</section>
