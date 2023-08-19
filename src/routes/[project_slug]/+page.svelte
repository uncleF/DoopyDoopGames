<script lang="ts">
  import Project from 'components/Project/Project.svelte';
  import ProjectMeta from 'components/ProjectMeta/ProjectMeta.svelte';

  export let data: ProjectPageData;

  const { slug, project } = data;
</script>

<Project
  {slug}
  {project} />
<ProjectMeta
  {data} />
