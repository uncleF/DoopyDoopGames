<script lang='ts'>
  import Error from "components/Error/Error.svelte";
  import SunnySudoku from "components/SunnySudoku/SunnySudoku.svelte";

  export let data: { slug: string, name: string };
</script>

{#if data.slug === 'sunny-sudoku'}
  <SunnySudoku />
{:else}
  <Error code={404} text="Project not found." />
{/if}
<svelte:head>
  <title>{data.name}</title>
</svelte:head>