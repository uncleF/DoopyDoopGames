<script lang="ts">
  import { iterateEntries } from 'utilities/iteration';
  import Store from 'components/Store/Store.svelte';

  export let slug: ProjectSlug;
  export let name: ProjectName;
  export let stores: ProjectStores;
</script>

{#each iterateEntries(stores) as [store, storeData] }
  {#if storeData}
    <Store
      {slug}
      {name}
      {store}
      href={storeData.href} />
  {/if}
{/each}
