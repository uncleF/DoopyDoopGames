<script lang="ts">
  import shared from "data/shared.json";
  import Legal from "components/Legal/Legal.svelte";
  import Meta from 'components/Meta/Meta.svelte';

  export let data: LegalPageData;

  const { name, slug, url, text } = data;
  const title = `${shared.legal[slug]} – ${name}`;
</script>

<Legal {text} />
<Meta
  {title}
  {url}
  description={title} />