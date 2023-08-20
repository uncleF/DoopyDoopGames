<script lang="ts">
  import Legal from "components/Legal/Legal.svelte";
  import Meta from 'components/Meta/Meta.svelte';

  export let data: LegalPageData;

  const { text, meta } = data;
</script>

<Legal {text} />
<Meta data={meta} />