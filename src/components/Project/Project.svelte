<script lang="ts">
  import { transformNameToClassNameComponent } from 'utilities/helpers';
  import PlayButton from 'components/PlayButton/PlayButton.svelte';
  import ProjectIcon from 'components/ProjectIcon/ProjectIcon.svelte';
  import Platforms from 'components/Platforms/Platforms.svelte';

  export let slug: ProjectSlug;
  export let project: ProjectData;
  
  const { description, icon, name, webGL, platforms } = project;
  const className = `${transformNameToClassNameComponent(name)}Project`;
</script>

<section id={slug} class={className}>
  <h1>{name}</h1>
  <p>{description}</p>
  <ProjectIcon
    src={icon}
    alt={name} />
  {#if webGL}
    <PlayButton
      {slug}
      {name} />
  {/if}
  {#if platforms}
    <Platforms
      {slug}
      {name}
      {platforms} />
  {/if}
</section>