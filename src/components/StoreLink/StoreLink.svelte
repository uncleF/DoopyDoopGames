<script lang="ts">
  import shared from 'data/shared.json';

  export let name: string;
  export let store: ProjectPlatform;
  export let href: string;

  const { linkText, classSuffix } = shared.stores[store];
  const text = `${name} – ${linkText}`;
  const className = `storeLink storeLink-${classSuffix}`;
</script>

<a
  {href}
  class={className}
  target="_blank"
  title={text}>
    {text}
</a>