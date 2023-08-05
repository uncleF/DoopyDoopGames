<script lang="ts">
  import Project from 'components/Project/Project.svelte';

  export let data: ProjectPageData;

  const { slug, project } = data;
</script>

<Project
  {slug}
  {project} />
<svelte:head>
  <title>{project.name}</title>
</svelte:head>