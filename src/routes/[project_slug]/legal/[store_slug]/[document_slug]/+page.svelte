<script lang="ts">
  import shared from "data/shared.json";
  import Legal from "components/Legal/Legal.svelte";

  export let data: LegalPageData;

  const { name, slug, text } = data;
  const title = `${shared.legal[slug]} – ${name}`;
</script>

<Legal {text} />
<svelte:head>
  <title>{title}</title>
  <meta name="description" content={title} />
</svelte:head>