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
  <source srcset={webpSrcset} type="image/webp" />
  <source srcset={pngSrcset} type="image/png" />
  <img {src} {alt} class="projectIcon" />
</picture>
