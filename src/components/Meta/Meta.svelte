<script lang="ts">
  import { generateKeywords } from 'utilities/helpers';

  export let data: MetaData;
  
  const { title, description, url, locale, tags, appleAppId, metaSiteName, metaImage, metaImageType, metaImageSize } = data;
  const keywords = generateKeywords(tags);
  const metaTitle = data.metaTitle || title;
  const metaDescription = data.metaDescription || description;
  const metaUrl = data.metaUrl || url;
  const { width, height } = metaImageSize;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={url} />
  {#if keywords}
    <meta name="keywords" content={keywords} />
  {/if}
  <slot>
    <meta property="og:title" content={metaTitle} />
    <meta property="og:description" content={metaDescription} />
    {#if metaSiteName}
      <meta property="og:site_name" content={metaSiteName} />
    {/if}
    <meta property="og:url" content={metaUrl} />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content={locale} />
    <meta property="og:image" content={metaImage} />
    <meta property="og:image:alt" content={metaTitle} />
    <meta property="og:image:type" content={metaImageType} />
    <meta property="og:image:width" content={width.toString()} />
    <meta property="og:image:height" content={height.toString()} />
    <meta name="twitter:title" content={metaTitle} />
    <meta name="twitter:description" content={metaDescription} />
    <meta name="twitter:site" content={metaUrl} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={metaImage}>
    <meta name="twitter:image:alt" content={metaTitle} />
    {#if appleAppId}
      <meta name="apple-itunes-app" content={`app-id=${appleAppId}`} />
    {/if}
  </slot>
</svelte:head>