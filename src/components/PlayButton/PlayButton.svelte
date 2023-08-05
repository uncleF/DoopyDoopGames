<script lang="ts">
  export let slug: string;
  export let name: string;
</script>

<a href={`/${slug}/play`} class="playButton">
  Play {name}
</a>