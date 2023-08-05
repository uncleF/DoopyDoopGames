<script lang="ts">
  export let links: NavigationLinks;
</script>

<nav class="navigation">
  <a href="#about" class="navigationLink">About</a>
  {#each links as { slug, name }}
    <a href="#{slug}" class="navigationLink">{name}</a>
  {/each}
  <a href="#support" class="navigationLink">Support</a>
</nav>