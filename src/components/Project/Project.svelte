<script lang="ts">
  import projects from 'data/projects.json';
  import { transformProjectNameToClassNameComponent } from 'utilities/project';
  import Stores from 'components/Stores/Stores.svelte';

  export let slug: ProjectSlug;

  const project = projects[slug];
  const className = `${transformProjectNameToClassNameComponent(project.name)}Project`;
</script>

<section id={slug} class={className}>
  <h1>{project.name}</h1>
  <img src={project.icon} alt={project.name} class="projectIcon">
  <p>{project.description}</p>
  <Stores
    name={project.name}
    slug={slug}
    stores={project.stores} />
</section>