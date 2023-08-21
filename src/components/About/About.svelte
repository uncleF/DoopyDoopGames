<script lang="ts">
  export let title: string;
  export let about: string;
</script>

<section id="about" class="about">
  <img
    src="/images/logo.svg"
    class="logo"
    width="407"
    height="629"
    alt={title}
    title={title} />
  <div class="aboutText">{about}</div>
</section>