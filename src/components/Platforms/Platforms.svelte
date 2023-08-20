<script lang="ts">
  import { iterateEntries } from 'utilities/helpers';
  import Platform from 'components/Platform/Platform.svelte';

  export let slug: ProjectSlug;
  export let name: ProjectName;
  export let platforms: ProjectPlatforms;
</script>

{#each iterateEntries(platforms) as [platform, platformData] }
  {#if platformData}
    <Platform
      {slug}
      {name}
      {platform}
      href={platformData.href} />
  {/if}
{/each}
