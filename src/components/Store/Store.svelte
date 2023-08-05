<script lang="ts">
  import shared from 'data/shared.json';
  import StoreLink from 'components/StoreLink/StoreLink.svelte';
  import StoreLegal from 'components/StoreLegal/StoreLegal.svelte';

  export let name: string;
  export let href: string;
  export let store: ProjectPlatformSlug;
  export let slug: string;

  const { name: storeName } = shared.stores[store];
  const className = `store store-${storeName}`;
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