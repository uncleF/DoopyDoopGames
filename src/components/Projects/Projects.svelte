<script lang="ts">
  import { iterateEntries } from 'utilities/helpers';
  import Project from 'components/Project/Project.svelte';

  export let projects: Partial<Projects>;
</script>

{#each iterateEntries(projects) as [slug, project]}
  {#if project}
    <Project
      {slug}
      {project} />
  {/if}
{/each}