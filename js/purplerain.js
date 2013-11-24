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
      setTimeout(function() {
        $('body').append('<div class="clouds"></div>');
      }, 500);
      setTimeout(function() {
        $('body').append('<div class="clouds"></div>');
      }, 1200);
      setTimeout(function() {
        $('body').append('<div class="clouds"></div>');
      }, 1700);
      setTimeout(function() {
        $('body').append('<div class="clouds"></div>');
      }, 2500);
      setTimeout(function() {
        $('body').append('<div class="clouds"></div>');
      }, 3000);
    } else if (weather === "tornado") {
      console.log("im a tornado");
      $('body').append('<div class="tornado"></div>');
    }
  }
});
