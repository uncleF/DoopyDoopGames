<script lang="ts">
  import shared from 'data/shared.json'

  export let slug: ProjectSlug
  export let name: ProjectName;

  const src = `/${slug}/play/webgl/index_web.html`
</script>

<section class="play">
  <iframe 
    {src}
    { ...shared.playFrameSize }
    title={name}
    class="playFrame"
    frameborder="0"
    allow="fullscreen"></iframe>
</section>