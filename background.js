chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  // TODO: Do stuff with the city name.
  alert(message.city);
});

function sendMessage(message) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}

var current_weather;

function getWeather() {
  navigator.geolocation.getCurrentPosition(function(position) {
    alert("Latitude: " + position.coords.latitude +
        "\nLongitude: " + position.coords.longitude);
  });
}
