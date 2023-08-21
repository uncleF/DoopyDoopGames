<script lang="ts">
  import SocialLink from "components/SocialLink/SocialLink.svelte";

  export let social: SocialLinks
</script>

<ul class="social">
  {#each social as { platform, href }}
    <li>
      <SocialLink {platform} {href} />
    </li>
  {/each}
</ul>
