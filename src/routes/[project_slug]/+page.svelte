<script lang="ts">
  import Meta from 'components/Meta/Meta.svelte';
  import Project from 'components/Project/Project.svelte';

  export let data: ProjectPageData;

  const { slug, project, meta } = data;
</script>

<Project {slug} {project} />
<Meta data={meta} />
