function checkFullscreen() {
  if (document) {
    return document.documentElement.requestFullscreen;
  }
  return false;
}

function toggleFullscreen() {
  if (document) {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }
}

function checkIOS() {
  if (navigator) {
    return navigator.userAgent.match(/(iPad|iPhone|iPod)/i);
  }
  return false;
}

function checkAndroid() {
  if (navigator) {
    return navigator.userAgent.match(/Android/i);
  }
  return false;
}

function updateDeviceClass() {
  if (checkIOS()) {
    document.documentElement.classList.add('device-ios');
  } else if (checkAndroid()) {
    document.documentElement.classList.add('device-android');
  }
}

function updateScrolledClass() {
  const isScrolled = window.scrollY > 30;
  document.documentElement.classList.toggle('window-is-scrolled', isScrolled);
}

function onScroll() {
  requestAnimationFrame(updateScrolledClass);
}

function onFullscreenChange(toggle) {
  if (document.fullscreenElement) {
    toggle.classList.add('fullscreenToggle-is-on');
  } else {
    toggle.classList.remove('fullscreenToggle-is-on');
  }
}

function initFullscreenToggle() {
  if (checkFullscreen()) {
    const toggle = document.querySelector('.fullscreenToggle');
    if (toggle) {
      toggle.addEventListener('click', toggleFullscreen);
      document.addEventListener('fullscreenchange', () => {
        onFullscreenChange(toggle);
      });
    }
  }
}

updateDeviceClass();
initFullscreenToggle();
window.addEventListener('scroll', onScroll);
