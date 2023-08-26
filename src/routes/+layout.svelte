<script lang="ts">
  import 'styles/styles.scss';
  import { browser } from '$app/environment';
  import { checkAndroid, checkIOS } from 'utilities/helpers'

  function updateDeviceClass() {
    if (browser) {
      if (checkIOS()) {
        document.documentElement.classList.add('device-ios');
      } else if (checkAndroid()) {
        document.documentElement.classList.add('device-android');
      }
    }
  }

  function updateScrolledClass(scrollPosition: number) {
    const isScrolled = scrollPosition > 30;
    document.documentElement.classList.toggle('window-is-scrolled', isScrolled);
  }

  function onScroll(scrollPosition: number) {
    if (browser) {
      requestAnimationFrame(() => { updateScrolledClass(scrollPosition) });
    }
  }

  let scrollY: number;

  $: onScroll(scrollY);
  updateDeviceClass();
</script>

<slot />
<svelte:window bind:scrollY={scrollY} />