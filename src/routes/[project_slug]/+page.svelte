<script lang="ts">
  import { setContext } from 'svelte';
  import Meta from 'components/Meta/Meta.svelte';
  import Project from 'components/Project/Project.svelte';

  export let data: ProjectPageData;

  const { slug, project, meta, utm } = data;
  setContext('utm', utm);
</script>

<Project {slug} {project} />
<Meta data={meta} />
