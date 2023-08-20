<script lang="ts">
  import shared from 'data/shared.json';
  import { transformNameToClassNameComponent } from 'utilities/helpers';

  export let name: string;
  export let platform: ProjectPlatformSlug;
  export let href: string;

  const { linkText, name: platformName } = shared.platforms[platform];
  const text = `${name} – ${linkText}`;
  const className = `platformLink platformLink-${transformNameToClassNameComponent(platformName)}`;
</script>

<a
  {href}
  class={className}
  target="_blank"
  title={text}
  rel="noindex nofollow">
    {text}
</a>
