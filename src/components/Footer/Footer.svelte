<script lang="ts">
  import { getContext } from 'svelte';
  import Social from "components/Social/Social.svelte";

  const social: SocialLinks = getContext('social');
  const email: string = getContext('email');
</script>

<footer class="footer">
  <Social {social} />
  <a href="mailto:{email}">{email}</a>
  <span class="copyright">&copy; 2023 Doopy Doop Games</span>
</footer>
