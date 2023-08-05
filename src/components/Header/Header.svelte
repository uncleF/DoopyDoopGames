<script lang="ts">
  import { getContext } from 'svelte';
  import Navigation from 'components/Navigation/Navigation.svelte';

  const links: NavigationLinks = getContext('links');
</script>

<header class="header">
  <Navigation {links} />
</header>