<script lang="ts">
  import shared from 'data/shared.json';

  export let slug: string;
  export let name: string;
</script>

<a href={`/${slug}/play`} class="playButton">
  {shared.webGLAction} {name}
</a>