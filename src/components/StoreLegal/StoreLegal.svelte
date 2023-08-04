<script lang="ts">
  import shared from 'data/shared.json';

  export let slug: string;
  export let store: ProjectPlatform;

  const text = shared.stores[store].legalLinkText;
</script>

<ul class="storeLegal">
  <li>
    <a href={`/${slug}/legal/${store}/privacy-policy`}>Privacy Policy {text}</a>
  </li>
  <li>
    <a href={`/${slug}/legal/${store}/terms-and-conditions`}>Terms and Conditions {text}</a>
  </li>
  <li>
    <a href={`/${slug}/support`}>Sunny Sudoku User Support</a>
  </li>
</ul>