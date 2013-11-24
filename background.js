var weather_types = 
{
    200: ["clouds", "rain", "thunder"],
     201: ["clouds", "rain", "thunder"],
     202: ["clouds", "rain", "thunder"],
     210: ["clouds", "rain", "thunder"],
     211: ["clouds", "rain", "thunder"],
     212: ["clouds", "rain", "thunder"],
     221: ["clouds", "rain", "thunder"],
     230: ["clouds", "rain", "thunder"],
     231: ["clouds", "rain", "thunder"],
     232: ["clouds", "rain", "thunder"],
     300: ["clouds", "rain"],
     301: ["clouds", "rain"],
     302: ["clouds", "rain"],
     310: ["clouds", "rain"],
     311: ["clouds", "rain"],
     312: ["clouds", "rain"],
     313: ["clouds", "rain"],
     314: ["clouds", "rain"],
     321: ["clouds", "rain"],
     500: ["clouds", "rain"],
     501: ["clouds", "rain"],
     502: ["clouds", "rain"],
     503: ["clouds", "rain"],
     504: ["clouds", "rain"],
     511: ["clouds", "rain"],
     520: ["clouds", "rain"],
     521: ["clouds", "rain"],
     522: ["clouds", "rain"],
     531: ["clouds", "rain"],
     600: ["snow"],
     601: ["snow"],
     602: ["snow"],
     611: ["rain", "snow"],
     612: ["rain", "snow"],
     615: ["rain", "snow"],
     620: ["rain", "snow"],
     621: ["rain", "snow"],
     622: ["rain", "snow"],
     800: ["sun"],
     801: ["sun", "clouds"],
     802: ["clouds"],
     803: ["clouds"],
     804: ["clouds"],
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // TODO: Do stuff with the city name.
    //alert(message.cityName);
    //sendMessage({weather: "sun"});
    if(message.cityName !== "") {
    getCityWeather(message.cityName);
    } else {
    getLocation();
    }
    });

function sendMessage(message) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message);
      });
}

var current_weather = new Object();
var geo_location = new Object();
//geo_location["lat"] = 35;
//geo_location["lon"] = 139;

function getCityWeather(city) {
  var url = "http://api.openweathermap.org/data/2.5/weather?" + "q=" + city + "&APPID=640c99dd9bbca6a64ecfc02325b17fad";
  console.log(url);
  var weather;
  $.get(url, function(data) {
      console.log(data);
      console.log("Weather is:" + data["weather"][0]["main"]);
      weather = data["weather"][0]["main"];
      },
      "json");
  current_weather["weather"] = "n";
  console.log(current_weather);
  sendMessage(current_weather);
}

function getWeather(lat, lon) {
  console.log("hello");
  var url = "http://api.openweathermap.org/data/2.5/weather?" + "lat=" + lat +"&lon=" + lon + "&APPID=640c99dd9bbca6a64ecfc02325b17fad";
  console.log(url);
  var weather;
  $.get(url, function(data) {
      console.log(data);
      console.log("Weather is:" + data["weather"][0]["main"]);
      weather = data["weather"][0]["main"];
      },
      "json");
  current_weather["weather"] = weather;
  sendMessage(current_weather);
}


function getLocation() {
  navigator.geolocation.getCurrentPosition(function(position) {
      getWeather(position.coords.latitude, position.coords.longitude);
      });
}
