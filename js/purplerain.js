chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log(message);
  weatherList = message.weather;
  for(var i = 0; i < weatherList.length; i++) {
    weather = weatherList[i];
    if (weather === "sun") {
      $('body').append('<div class="sun"></div>');
    } else if (weather === "rain") {
      $('body').append('<div class="rain"></div>');
    } else if (weather === "clouds") {
      $('body').append('<div class="clouds"></div>');
    }
  }
});
