<script lang="ts">
  import { iterateEntries } from 'utilities/iteration';
  import shared from 'data/shared.json';

  export let slug: ProjectSlug;
  export let name: ProjectName;
  export let store: ProjectPlatformSlug;

  const text = shared.stores[store].legalLinkText;
</script>

<ul class="storeLegal">
  {#each iterateEntries(shared.legal) as [legalSlug, legalTitle]}
    <li>
      <a href={`/${slug}/legal/${store}/${legalSlug}`}>{legalTitle} {text}</a>
    </li>
  {/each}
  <li>
    <a href={`/${slug}/support`}>{name} User Support</a>
  </li>
</ul>