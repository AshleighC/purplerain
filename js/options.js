$(document).ready(function() {
  chrome.storage.local.get("cityName", function(result) {
    $('#cityName').val(result.cityName ? result.cityName : "Berkeley");
  });
});

$('#startButton').click(function() {
  var cityNameObj = {"cityName": $('#cityName').val()}
  chrome.storage.local.set(cityNameObj);
  chrome.runtime.sendMessage(cityNameObj);
});
