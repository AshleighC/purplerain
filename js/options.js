$(document).ready(function() {
  // TODO: Get saved preferences from storage.
  $('#cityName').val("Berkeley");
});

$('#startButton').click(function() {
  // TODO: Save preferences in storage.
  var cityName = $('#cityName').val();
  chrome.runtime.sendMessage({city: cityName});
});
