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
var geo_location = new Object();
//geo_location["lat"] = 35;
//geo_location["lon"] = 139;

function getWeather(lat, lon) {
  console.log("hello");
  var url = "http://api.openweathermap.org/data/2.5/weather?" + "lat=" + lat +"&lon=" + lon + "&APPID=640c99dd9bbca6a64ecfc02325b17fad";
  console.log(url);
  $.get(url, function(data) {
      console.log("success");
      console.log(data);
      console.log("Weather is:" + data["weather"][0]["main"]);
      sendMessage(data["weather"]["main"]);
      },
      "json");
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(function(position) {
      getWeather(position.coords.latitude, position.coords.longitude);
      });
}
getLocation();
