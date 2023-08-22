<script lang="ts">
  import { getContext } from 'svelte';
  import shared from 'data/shared.json';
  import { generateCopyrightYears } from 'utilities/helpers';
  import Social from "components/Social/Social.svelte";

  const social: SocialLinks = getContext('social');
  const email: string = getContext('email');
  const copyrightsYears = generateCopyrightYears(shared.copyrightYear);
</script>

<footer class="footer">
  <Social {social} />
  <a href="mailto:{email}">{email}</a>
  <span class="copyright">&copy; {copyrightsYears} {shared.title}</span>
</footer>
