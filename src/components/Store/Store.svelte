<script lang="ts">
  import config from 'config/config.json';
  import StoreLink from 'components/StoreLink/StoreLink.svelte';
  import StoreLegal from 'components/StoreLegal/StoreLegal.svelte';

  export let name: string;
  export let href: string;
  export let store: ProjectPlatforms;
  export let slug: string;

  const { classSuffix } = config.stores[store];
  const className = `store store-${classSuffix}`;
</script>

<div class={className}>
  <StoreLink
    {name}
    {store}
    {href} />
  <StoreLegal
    {store}
    {slug} />
</div>