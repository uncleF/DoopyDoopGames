<script lang="ts">
  import shared from 'data/shared.json'
  import { transformNameToClassNameComponent } from 'utilities/helpers';

  export let slug: ProjectSlug
  export let name: ProjectName;

  const src = `/${slug}/play/webgl/index_web.html`
  const className = `${transformNameToClassNameComponent(name)}Play`;
</script>

<section class={className}>
  <iframe 
    {src}
    { ...shared.playFrameSize }
    title={name}
    class="playFrame"
    frameborder="0"
    allow="fullscreen"></iframe>
  <button class="fullscreenToggle">Toggle Fullscreen</button>
</section>