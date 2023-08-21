<script lang="ts">
  import { transformNameToClassNameComponent } from 'utilities/helpers';

  export let platform: SocialPlatform;
  export let href: string;

  const className = `socialLink socialLink-${transformNameToClassNameComponent(platform)}`;
</script>

<a
  {href}
  class={className}
  rel="nofollow noindex"
  target="_blank">
    {platform}
</a>
