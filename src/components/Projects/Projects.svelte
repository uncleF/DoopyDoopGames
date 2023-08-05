<script lang="ts">
  import { iterateEntries } from 'utilities/iteration';
  import Project from 'components/Project/Project.svelte';

  export let projects: Projects;
</script>

{#each iterateEntries(projects) as [slug, project]}
  <Project
    {slug}
    {project} />
{/each}