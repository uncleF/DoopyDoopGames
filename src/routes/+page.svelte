<script lang="ts">
  import { setContext } from 'svelte';
  import shared from 'data/shared.json';
  import About from 'components/About/About.svelte';
  import Header from 'components/Header/Header.svelte';
  import Projects from 'components/Projects/Projects.svelte';
  import Support from 'components/Support/Support.svelte';
  import Footer from 'components/Footer/Footer.svelte';

  export let data: IndexPageData;

  const { projects, links } = data;
  setContext('links', links);
</script>

<Header />
<About />
<Projects {projects} />
<Support />
<Footer />
<svelte:head>
  <title>{shared.title}</title>
  <meta name="description" content={shared.description} />
</svelte:head>