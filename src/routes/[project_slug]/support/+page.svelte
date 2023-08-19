<script lang="ts">
  import shared from "data/shared.json";
  import Footer from 'components/Footer/Footer.svelte';
  import Meta from 'components/Meta/Meta.svelte';
  import Support from 'components/Support/Support.svelte';
  
  export let data: SupportPageData;

  const { name, text, url } = data;
  const title = `${shared.supportTitle} – ${name}`
</script>

<Support {text} />
<Footer />
<Meta
  {title}
  {url}
  description={title} />