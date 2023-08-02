<script lang="ts">
  import Footer from 'components/Footer/Footer.svelte';
  import Support from 'components/Support/Support.svelte';
  
  export let data: { name: string, text: string };
</script>

<Support text={data.text} />
<Footer />
<svelte:head>
  <title>{data.name} User Support</title>
</svelte:head>