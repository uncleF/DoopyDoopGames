<script lang="ts">
  import shared from 'data/shared.json';
  import { transformNameToClassNameComponent } from 'utilities/helpers';

  export let name: string;
  export let store: ProjectPlatformSlug;
  export let href: string;

  const { linkText, name: storeName } = shared.stores[store];
  const text = `${name} – ${linkText}`;
  const className = `storeLink storeLink-${transformNameToClassNameComponent(storeName)}`;
</script>

<a
  {href}
  class={className}
  target="_blank"
  title={text}
  rel="noindex nofollow">
    {text}
</a>