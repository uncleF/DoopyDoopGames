<script lang="ts">
    import StoreLink from "components/StoreLink/StoreLink.svelte";
    import StoreLegal from "components/StoreLegal/StoreLegal.svelte";

    export let name: string;
    export let href: string;
    export let store: AppPlatforms;
    export let slug: string;
</script>
Platforms
<div class="store">
  <StoreLink
    {name}
    {store}
    {href} />
  <StoreLegal
    {store}
    {slug} />
</div>