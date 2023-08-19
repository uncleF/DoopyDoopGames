<script lang="ts">
  import shared from 'data/shared.json';
  import { transformNameToClassNameComponent } from 'utilities/helpers';
  import StoreLink from 'components/StoreLink/StoreLink.svelte';
  import StoreLegal from 'components/StoreLegal/StoreLegal.svelte';

  export let name: ProjectName;
  export let href: string;
  export let store: ProjectPlatformSlug;
  export let slug: ProjectSlug;

  const { name: storeName } = shared.stores[store];
  const className = `store store-${transformNameToClassNameComponent(storeName)}`;
</script>

<div class={className}>
  <StoreLink
    {name}
    {store}
    {href} />
  <StoreLegal
    {store}
    {name}
    {slug} />
</div>