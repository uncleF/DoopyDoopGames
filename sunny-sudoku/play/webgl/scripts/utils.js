var preloaderNode;
var preloadProgressBarNode;

function unityProgress(progress) {

  if (!preloaderNode) {
    preloaderNode = document.querySelector(".applicationPreload");
  }

  if (!preloadProgressBarNode) {
    preloadProgressBarNode = document.querySelector(".applicationPreloadProgressBar");
  }

  preloadProgressBarNode.classList.add("applicationPreloadProgressBar-is-animated");
  preloadProgressBarNode.style.transform = "translateX(" + Math.floor((progress - 1) * 100) + "%)";

  if (progress >= 1) {
    preloaderNode.style.display = "none";
  }
}

function unityPopup(text, buttons) {
  alert(text);
}

window.addEventListener("load", function () {
  var sessionTS = Date.now();

  try {
    localStorage.setItem("session_ts", sessionTS);
  }
  catch(e) {}

  window.addEventListener("focus", function () {
    var savedSessionTS;

    try {
      savedSessionTS = parseInt(localStorage.getItem("session_ts"), 10);
    }
    catch (e) {}

    if (savedSessionTS && savedSessionTS > sessionTS) {
      var overlayNode = document.querySelector(".applicationWarning");
      if (overlayNode) {
        overlayNode.style.display = "flex";
      }
    }
  });
});
