chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log(message);
  if (message.weather === "sun") {
    $('body').append('<div class="sun"></div>')
  }
});
