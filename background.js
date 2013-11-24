chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  //Listener for new message on "options" box
  if (message.city === "tornado") {
    //special behavior for tornado
    current_weather["weather"] = ["tornado"];
    sendMessage(current_weather);
  } else if (message.city !== "") {
    //weather based off city
    setCity(message.city, getWeather);
  } else {
    //weather based off saved city
    getWeather();
  }
});

/**
 * Sends the given message to the content script running in the current tab.
 */
function sendMessage(message) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message);
  });
}

/**
 * Sets the current city to the given city. Callback is optional.
 */
function setCity(city, callback) {
  callback = callback || function() {};
  chrome.storage.local.set({"city": city}, callback);
}

/**
 * Sets the current city to the user's location.
 */
function setCityToUserLocation() {
  navigator.geolocation.getCurrentPosition(function(position) {
    var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="
        + position.coords.latitude + "," + position.coords.longitude
        + "&sensor=false";
    $.get(url, function(data) {
      setCity(getLocality(data["results"][0]["address_components"]));
    });
  });
}

/**
 * Helper function used when finding the user's location.
 */
function getLocality(components) {
  for (i in components) {
    if (components[i]["types"].indexOf("locality") !== -1
        || components[i]["types"].indexOf("sublocality") !== -1) {
      return components[i]["long_name"];
    }
  }
}

/**
 * Sets the current city to the user's preferred city if it has been
 * specified, or to the user's location if they have not specified a
 * preferred city.
 */
function initializeCity() {
  chrome.storage.local.get("city", function(result) {
    if (result.city) {
      setCity(result.city);
    } else {
      setCityToUserLocation();
    }
  });
}

/**
 * Gets the weather for the current city using the Open Weather Map API.
 * Sends a message with weather styles if successful.
 */
function getWeather() {
  chrome.storage.local.get("city", function(result) {
    var url = "http://api.openweathermap.org/data/2.5/weather?" + "q="
        + result.city + "&APPID=640c99dd9bbca6a64ecfc02325b17fad";
    $.get(url, function(data) {
      $.getJSON("weather.json", function(weather_types) {
        sendMessage({"weather": weather_types[data.weather[0].id]});
      });
    }, "json");
  });
}
