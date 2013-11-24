var cityName;
var current_weather;
var geo_location = new Object();

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  // TODO: Do stuff with the city name.
  //alert(message.cityName);
  sendMessage({weather: "sun"});
});

function sendMessage(message) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}

function getWeather(lat, lon) {
  console.log("hello");
  var url = "http://api.openweathermap.org/data/2.5/weather?" + "lat=" + lat +"&lon=" + lon + "&APPID=640c99dd9bbca6a64ecfc02325b17fad";
  console.log(url);
  $.get(url, function(data) {
      console.log("success");
      console.log(data);
      console.log("Weather is:" + data["weather"][0]["main"]);
      },
      "json");
  sendMessage(data["weather"][0]["main"]);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(function(position) {
      getWeather(position.coords.latitude, position.coords.longitude);
      });
}

chrome.storage.local.get("cityName", function(result) {
  if (result.cityName) {
    cityName = result.cityName;
    alert(cityName);
  } else {
    navigator.geolocation.getCurrentPosition(function(position) {
      // TODO: Do stuff with location.
      //alert(position.coords.latitude + ", " + position.coords.longitude);
    });
  }
});

getLocation();
