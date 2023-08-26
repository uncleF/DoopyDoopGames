<script lang="ts">
  import { getContext } from 'svelte';
  import shared from 'data/shared.json';
  import { generateUTM, addUTM, transformNameToClassNameComponent } from 'utilities/helpers';

  export let name: string;
  export let platform: ProjectPlatformSlug;
  export let href: string;

  const { linkText, name: platformName } = shared.platforms[platform];
  const text = `${name} – ${linkText}`;
  const className = `platformLink platformLink-${transformNameToClassNameComponent(platformName)}`;
  const utm: UTM = getContext('utm');
  let hrefWithUtm = href;
  if (utm) {
    const utmParameters: UTM = { ...utm };
    utmParameters.content = "banner_link";
    const utmString = generateUTM(utmParameters);
    hrefWithUtm = addUTM(href, utmString);
  }
</script>

<a
  href={hrefWithUtm}
  class={className}
  target="_blank"
  title={text}
  rel="noindex nofollow">
    {text}
</a>
