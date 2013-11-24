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
  $.each(message.weather, function(i, weather) {
    handler[weather]();
  });
});
