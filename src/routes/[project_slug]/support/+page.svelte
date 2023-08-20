<script lang="ts">
  import Footer from 'components/Footer/Footer.svelte';
  import Meta from 'components/Meta/Meta.svelte';
  import Support from 'components/Support/Support.svelte';
  
  export let data: SupportPageData;

  const { text, meta } = data;
</script>

<Support {text} />
<Footer />
<Meta data={meta} />