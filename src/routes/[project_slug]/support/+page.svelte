<script lang="ts">
  import projects from 'data/projects.json';
  import Footer from 'components/Footer/Footer.svelte';
  import Support from 'components/Support/Support.svelte';
  
  export let data: { slug: ProjectSlug };

  const project = projects[data.slug];
</script>

<Support text={project.support} />
<Footer />
<svelte:head>
  <title>{project.name} User Support</title>
</svelte:head>