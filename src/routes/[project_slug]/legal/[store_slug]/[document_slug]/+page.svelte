<script lang='ts'>
  import Legal from "components/Legal/Legal.svelte";

  export let data: { name: string, document: string, text: string };
</script>

<Legal text={data.text} />
<svelte:head>
  <title>{data.name} {data.document}</title>
</svelte:head>