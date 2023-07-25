<script lang="ts">
  import appConfig from 'config/appConfig.json';

  export let store: AppPlatforms;
  export let slug: string;

  const text = appConfig.stores[store].legalLinkText;
</script>

<ul class="storeLegal">
  <li>
    <a href={`/${slug}/legal/${store}/privacy-policy.html`}>Privacy Policy {text}</a>
  </li>
  <li>
    <a href={`/${slug}/legal/${store}/terms-and-conditions.html`}>Terms and Conditions {text}</a>
  </li>  
</ul>