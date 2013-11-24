var handler = {};

handler.addDefaultHandler = function(weather) {
  this[weather] = function() {
    $('body').append('<div class="' + weather + '"></div>');
  };
};

handler.addDefaultHandler("sun");
handler.addDefaultHandler("rain");
handler.addDefaultHandler("tornado");

handler["clouds"] = function() {
  $.each([500, 1200, 1700, 2500, 3000], function(i, delay) {
    setTimeout(function() {
      $('body').append('<div class="clouds"></div>');
    }, delay);
  });
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  for (weather in handler) {
    $.each($('.' + weather), function(i, div) {
      div.remove();
    });
  }
  $.each(message.weather, function(i, weather) {
    handler[weather]();
  });
});
