<script lang="ts">
  import { setContext } from 'svelte';
  import Meta from 'components/Meta/Meta.svelte';
  import Play from 'components/Play/Play.svelte';

  export let data: PlayPageData;

  const { slug, project, meta, utm } = data;
  const { name } = project;
  setContext('utm', utm);
</script>

<Play {slug} {name} />
<Meta data={meta} />
