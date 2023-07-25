<script lang="ts">
  import appConfig from 'config/appConfig.json';

  export let name: string;
  export let store: AppPlatforms;
  export let href: string;

  const text = `${name} – ${appConfig.stores[store].linkText}`;
  const className = `storeLink-${appConfig.stores[store].linkClassSuffix}`
</script>

<a
  {href}
  class={className}
  target="_blank"
  title={text}>
    {text}
</a>