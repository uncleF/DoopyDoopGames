<script lang="ts">
  import Meta from 'components/Meta/Meta.svelte';
  import Play from 'components/Play/Play.svelte';

  export let data: PlayPageData;

  const { slug, project, meta } = data;
  const { name } = project;
</script>

<Play {slug} {name} />
<Meta data={meta} />
