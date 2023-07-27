<script lang="ts">
  import config from 'config/config.json';

  export let store: ProjectPlatforms;
  export let slug: string;

  const text = config.stores[store].legalLinkText;
</script>

<ul class="storeLegal">
  <li>
    <a href={`/${slug}/legal/${store}/privacy-policy`}>Privacy Policy {text}</a>
  </li>
  <li>
    <a href={`/${slug}/legal/${store}/terms-and-conditions`}>Terms and Conditions {text}</a>
  </li>
  <li>
    <a href="/sunny-sudoku/support">Sunny Sudoku User Support</a>
  </li>
</ul>