<script lang="ts">
  import shared from 'data/shared.json';
  import StoreLink from 'components/StoreLink/StoreLink.svelte';
  import StoreLegal from 'components/StoreLegal/StoreLegal.svelte';

  export let name: string;
  export let href: string;
  export let store: ProjectPlatform;
  export let slug: string;

  const { classSuffix } = shared.stores[store];
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