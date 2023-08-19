<script lang="ts">
  import { generateImageMIMEType } from 'utilities/helpers';
  import shared from 'data/shared.json';

  export let data: ProjectPageData;

  const { project, url } = data;
  const { name, subtitle, briefDescription, tags, metaImage } = project;
  const title = `${name} – ${subtitle}`;
  const keywords = tags.join(", ");
  const appleAppId = project.stores?.apple?.id;
  const metaImageURL = `${shared.url}${metaImage}`
  const metaImageType = generateImageMIMEType(metaImage)
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={briefDescription} />
  {#if keywords}
    <meta name="keywords" content={keywords} />
  {/if}
  <link rel="canonical" href={url} />
  <meta property="og:title" content={name} />
  <meta property="og:description" content={briefDescription} />
  <meta property="og:site_name" content={name} />
  <meta property="og:url" content={url} />
  <meta property="og:image" content={metaImageURL} />
  <meta property="og:image:alt" content={title} />
  <meta property="og:image:type" content={metaImageType} />
  <meta property="og:image:width" content={shared.metaImageSize.width.toString()} />
  <meta property="og:image:height" content={shared.metaImageSize.height.toString()} />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content={shared.locale} />
  <meta name="twitter:title" content={name} />
  <meta name="twitter:description" content={briefDescription} />
  <meta name="twitter:site" content={url} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content={metaImageURL} />
  <meta name="twitter:image:alt" content={title} />
  {#if appleAppId}
    <meta name="apple-itunes-app" content={`app-id=${appleAppId}`} />
  {/if}
</svelte:head>