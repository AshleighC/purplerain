chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  // TODO: Do stuff with the city name.
  alert(message.cityName);
});

function sendMessage(message) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}

var current_weather;
var geo_location = new Object();
//geo_location["lat"] = 35;
//geo_location["lon"] = 139;

function getWeather(lat, lon) {
  console.log("hello");
  var url = "api.openweathermap.org/data/2.5/weather?" + "lat=" + lat +"&lon=" + lon;
  console.log(url);
  $.get(url, function(data) {
    console.log("success");
    console.log("Weather is:" + data["weather"]["main"]);
    sendMessage(data["weather"]["main"]);
    });
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(function(position) {
    getWeather(position.coords.latitude, position.coords.longitude);
    /*alert("Latitude: " + position.coords.latitude +
        "\nLongitude: " + position.coords.longitude);*/
  });
}

getLocation();
