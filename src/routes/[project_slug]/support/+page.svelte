<script lang="ts">
  import { setContext } from 'svelte';
  import Footer from 'components/Footer/Footer.svelte';
  import Meta from 'components/Meta/Meta.svelte';
  import Support from 'components/Support/Support.svelte';
  
  export let data: SupportPageData;

  const { text, social, email, meta } = data;
  setContext('social', social);
  setContext('email', email);
</script>

<Support {text} />
<Footer />
<Meta data={meta} />