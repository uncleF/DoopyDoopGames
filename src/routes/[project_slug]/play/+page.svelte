<script lang="ts">
  import Play from 'components/Play/Play.svelte';
  import PlayMeta from 'components/PlayMeta/PlayMeta.svelte';

  export let data: PlayPageData;

  const { slug, project } = data;
  const { name } = project;
</script>

<Play
  {slug}
  {name} />
<PlayMeta
  {data} />
