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
      getLocality(data["results"][0]["address_components"], setCity);
    });
  });
}

/**
 * Helper function used when finding the user's location.
 */
function getLocality(components, callback) {
  $.each(components, function(i, component) {
    if (component["types"].indexOf("sublocality") !== -1
        || component["types"].indexOf("locality") !== -1) {
      callback(component["long_name"]);
    }
  });
}

/**
 * Gets the weather for the current city using the Open Weather Map API.
 * Sends a message with weather styles if successful.
 * Shows an error message if unsuccessful.
 */
function getWeather() {
  chrome.storage.local.get("city", function(result) {
    var popup = chrome.extension.getViews({"type": "popup"})[0];
    var request = $.get("http://api.openweathermap.org/data/2.5/weather?"
        + "q=" + result.city + "&APPID=640c99dd9bbca6a64ecfc02325b17fad");

    request.success(function(data) {
      popup.close();
      $.getJSON("weather.json", function(weatherTypes) {
        sendMessage({"weather": weatherTypes[data.weather[0].id]});
      });
    });

    request.error(function(jqXHR, textStatus, errorThrown) {
      popup.$('#loadingImage').hide();
      popup.$('#errorText').show();
    });
  });
}

/**
 * Helper function for converting strings to title case.
 */
function titleCase(string) {
  return string.replace(/\w\S*/g, function(text) {
    return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
  });
}

/**
 * Sets the current city to the user's preferred city if it has been
 * specified, or to the user's location if they have not specified a
 * preferred city.
 */
chrome.storage.local.get("city", function(result) {
  if (result.city) {
    setCity(result.city);
  } else {
    setCityToUserLocation();
  }
});

/**
 * Adds a listener for messages coming from the popup.
 */
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  $.getJSON("special.json", function(special) {
    if (special.indexOf(message.city.toLowerCase()) != -1) {
      sendMessage({"weather": [message.city.toLowerCase()]});
    } else if (message.city !== "") {
      setCity(titleCase(message.city), getWeather);
    } else {
      getWeather();
    }
  });
});
