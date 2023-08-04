<script lang="ts">
  import shared from 'data/shared.json';

  export let text = shared.support;
</script>

<section id="support" class="support">
  <h1>Support</h1>
  <p>{@html text}</p>
</section>