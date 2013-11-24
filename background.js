var current_weather;
var geo_location = new Object();

function sendMessage(message) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}

function setCity(city) {
  chrome.storage.local.set({"city": city});
}

function setCityToCurrentPosition() {
  navigator.geolocation.getCurrentPosition(function(position) {
    var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="
        + position.coords.latitude + "," + position.coords.longitude
        + "&sensor=false";
    $.get(url, function(data) {
      setCity(getLocality(data["results"][0]["address_components"]));
    });
  });
}

function getLocality(components) {
  for (i in components) {
    if (components[i]["types"].indexOf("locality") !== -1
        || components[i]["types"].indexOf("sublocality") !== -1) {
      return components[i]["long_name"];
    }
  }
}

function initializeCity() {
  chrome.storage.local.get("city", function(result) {
    if (result.city) {
      setCity(result.city);
    } else {
      setCityToCurrentPosition();
    }
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
  }, "json");
  sendMessage(data["weather"][0]["main"]);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(function(position) {
    getWeather(position.coords.latitude, position.coords.longitude);
  });
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  setCity(message.city);
  sendMessage({weather: "sun"});
});

initializeCity();
getLocation();
