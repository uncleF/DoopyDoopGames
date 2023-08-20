<script lang="ts">
  import { iterateEntries } from 'utilities/helpers';
  import shared from 'data/shared.json';

  export let slug: ProjectSlug;
  export let name: ProjectName;
  export let platform: ProjectPlatformSlug;

  const text = shared.platforms[platform].legalLinkText;
</script>

<ul class="platformLegal">
  {#each iterateEntries(shared.legal) as [legalSlug, legalTitle]}
    <li>
      <a href={`/${slug}/legal/${platform}/${legalSlug}`}>{legalTitle} {text}</a>
    </li>
  {/each}
  <li>
    <a href={`/${slug}/support`}>{name} User Support</a>
  </li>
</ul>