<script lang='ts'>
  import projects from 'data/projects.json';
  import Project from 'components/Project/Project.svelte';

  export let data: { slug: ProjectSlug };

  const { slug } = data;
  const project = projects[slug];
</script>

<Project {slug} />
<svelte:head>
  <title>{project.name}</title>
</svelte:head>