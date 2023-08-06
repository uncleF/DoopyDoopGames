<script lang="ts">
  import shared from "data/shared.json";
  import Footer from 'components/Footer/Footer.svelte';
  import Support from 'components/Support/Support.svelte';
  
  export let data: SupportPageData;

  const { name, text } = data;
  const title = `${shared.supportTitle} – ${name}`
</script>

<Support {text} />
<Footer />
<svelte:head>
  <title>{title}</title>
  <meta name="description" content={title} />
</svelte:head>