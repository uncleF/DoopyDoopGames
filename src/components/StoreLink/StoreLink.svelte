<script lang="ts">
  import config from 'config/config.json';

  export let name: string;
  export let store: ProjectPlatforms;
  export let href: string;

  const { linkText, classSuffix } = config.stores[store];
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