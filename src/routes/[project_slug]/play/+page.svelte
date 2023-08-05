<script lang="ts">
  import shared from "data/shared.json";
  import Play from 'components/Play/Play.svelte';

  export let data: PlayPageData;

  const { name, playURL } = data;
  const title = `${shared.playTitle} – ${name}`;
</script>

<Play url={playURL} />
<svelte:head>
  <title>{title}</title>
</svelte:head>