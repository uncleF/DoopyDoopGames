<script lang="ts">
  import { generateImageMIMEType } from 'utilities/helpers';
  import shared from 'data/shared.json';

  export let title: string = shared.title;
  export let description: string = shared.description;
  export let url: string = shared.url;

  const { metaImage } = shared;
  const metaImageURL = `${shared.url}${metaImage}`
  const metaImageType = generateImageMIMEType(metaImage)
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={url} />
  <slot>
    <meta property="og:title" content={title} />
    <meta property="og:description" content={shared.description} />
    <meta property="og:site_name" content={shared.title} />
    <meta property="og:url" content={shared.url} />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content={shared.locale} />
    <meta property="og:image" content={metaImageURL} />
    <meta property="og:image:alt" content={shared.title} />
    <meta property="og:image:type" content={metaImageType} />
    <meta property="og:image:width" content={shared.metaImageSize.width.toString()} />
    <meta property="og:image:height" content={shared.metaImageSize.height.toString()} />
    <meta name="twitter:title" content={shared.title} />
    <meta name="twitter:description" content={shared.description} />
    <meta name="twitter:site" content={shared.url} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={metaImageURL}>
    <meta name="twitter:image:alt" content={shared.title} />
  </slot>
</svelte:head>