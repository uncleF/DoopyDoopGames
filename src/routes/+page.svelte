<script lang="ts">
  import { setContext } from 'svelte';
  import About from 'components/About/About.svelte';
  import Header from 'components/Header/Header.svelte';
  import Meta from 'components/Meta/Meta.svelte';
  import Projects from 'components/Projects/Projects.svelte';
  import Support from 'components/Support/Support.svelte';
  import Footer from 'components/Footer/Footer.svelte';

  export let data: IndexPageData;

  const { title, projects, links, meta, support } = data;
  setContext('links', links);
</script>

<Header />
<About {title} />
<Projects {projects} />
<Support text={support} />
<Footer />
<Meta data={meta} />
