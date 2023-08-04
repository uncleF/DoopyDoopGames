<script lang="ts">
  import projects from 'data/projects.json';
  import Play from 'components/Play/Play.svelte';

  export let data: { slug: ProjectSlug };

  const project = projects[data.slug];
</script>

<Play url={project.playURL} />