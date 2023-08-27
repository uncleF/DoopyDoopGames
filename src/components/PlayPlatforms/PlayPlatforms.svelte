<script lang="ts">
  import { iterateEntries } from 'utilities/helpers';
  import PlatformLink from 'components/PlatformLink/PlatformLink.svelte';

  export let name: ProjectName;
  export let platforms: ProjectPlatforms;
</script>

<div class="playPlatforms">
  {#each iterateEntries(platforms) as [platform, platformData] }
    {#if platformData}
      <PlatformLink
        {name}
        {platform}
        href={platformData.href} />
    {/if}
  {/each}
</div>