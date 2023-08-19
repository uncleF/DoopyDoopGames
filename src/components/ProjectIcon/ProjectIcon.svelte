<script lang="ts">
  export let src: string;
  export let alt: string;

  const filePath = src.replace(/\.[^.]+$/, '');
  const png2x = `${filePath}2x.png`;
  const webp = `${filePath}.webp`;
  const webp2x = `${filePath}2x.webp`;
  const pngSrcset = `${png2x} 2x, ${src} 1x`;
  const webpSrcset = `${webp2x} 2x, ${webp} 1x`;
</script>

<picture class="projectIcon">
  <source srcset={webpSrcset} type="image/webp" width="130" height="130" />
  <source srcset={pngSrcset} type="image/png" width="130" height="130" />
  <img {src} {alt} title={alt} class="projectIcon" width="130" height="130" loading="eager" />
</picture>
