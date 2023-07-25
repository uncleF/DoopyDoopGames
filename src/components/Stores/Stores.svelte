<script lang="ts">
  import Store from 'components/Store/Store.svelte';

  export let name: string;
  export let slug: string;
  export let stores: AppStore[];
</script>

{#each stores as { store, href }}
  <Store
    {name}
    {store}
    {href}
    {slug} />
{/each}
