<script lang='ts'>
  import projects from 'data/projects.json';
  import About from 'components/About/About.svelte';
  import Header from 'components/Header/Header.svelte';
  import Support from 'components/Support/Support.svelte';
  import Project from 'components/Project/Project.svelte';
  import Footer from 'components/Footer/Footer.svelte';
</script>

<Header />
<About />
{#each Object.entries(projects) as [slug, project]}
  {#if project.enabled}
    <Project {slug} />
  {/if}
{/each}
<Support />
<Footer />
<svelte:head>
  <title>Doopy Doop Games</title>
</svelte:head>