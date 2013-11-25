var handler = {};

handler.defaults = ["sun", "clouds", "rain", "snow"];
handler.specials = ["tornado", "avalanche"];

$.each(handler.defaults, function(i, weather) {
  handler[weather] = function() {
    $('body').append('<div class="' + weather + '"></div>');
  }
});

$.each(handler.specials, function(i, weather) {
  handler[weather] = function() {
    $("*").addClass(weather);
  }
});

handler["clouds"] = function() {
  $.each([500, 1200, 1700, 2500, 3000], function(i, delay) {
    setTimeout(function() {
      $('body').append('<div class="clouds"></div>');
    }, delay);
  });
}

function clearWeather() {
  $.each(handler.defaults, function(i, weather) {
    $.each($('.' + weather), function(i, div) {
      div.remove();
    });
  });
  $.each(handler.specials, function(i, weather) {
    $('*').removeClass(weather);
  });
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  clearWeather();
  $.each(message.weather, function(i, weather) {
    if (weather in handler) {
      handler[weather]();
    }
  });
});
