<script lang="ts">
  import shared from 'data/shared.json';
  import { transformNameToClassNameComponent } from 'utilities/helpers';
  import PlatformLink from 'components/PlatformLink/PlatformLink.svelte';
  import PlatformLegal from 'components/PlatformLegal/PlatformLegal.svelte';

  export let name: ProjectName;
  export let href: string;
  export let platform: ProjectPlatformSlug;
  export let slug: ProjectSlug;

  const { name: platformName } = shared.platforms[platform];
  const className = `platform platform-${transformNameToClassNameComponent(platformName)}`;
</script>

<div class={className}>
  <PlatformLink
    {name}
    {platform}
    {href} />
  <PlatformLegal
    {name}
    {platform}
    {slug} />
</div>