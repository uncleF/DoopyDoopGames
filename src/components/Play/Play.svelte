<script lang="ts">
  import shared from 'data/shared.json'

  export let url: string;
  export let name: ProjectName;
</script>

<section class="play">
  <iframe src={url} class="playFrame" frameborder="0" { ...shared.playFrameSize } title={name} allow="fullscreen"></iframe>
</section>