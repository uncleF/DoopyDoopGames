<script lang="ts">
  import projects from 'data/projects.json';
</script>

<nav class="navigation">
  <a href="#about" class="navigationLink">About</a>
  {#each Object.entries(projects) as [slug, project]}
    {#if project.enabled}
      <a href="#{slug}" class="navigationLink">{project.name}</a>
    {/if}
  {/each}
  <a href="#support" class="navigationLink">Support</a>
</nav>