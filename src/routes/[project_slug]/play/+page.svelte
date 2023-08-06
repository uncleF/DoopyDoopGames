<script lang="ts">
  import shared from "data/shared.json";
  import Play from 'components/Play/Play.svelte';

  export let data: PlayPageData;

  const { slug, name } = data;
  const title = `${shared.playTitle} – ${name}`;
</script>

<Play
  {slug}
  {name} />
<svelte:head>
  <title>{title}</title>
  <meta name="description" content={title} />
</svelte:head>