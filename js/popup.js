$(document).ready(function() {
  chrome.storage.local.get("city", function(result) {
    $('#cityName').val(result.city);
    $('#loadingImage').hide();
  });
});

$('#startButton').click(function() {
  $('#loadingImage').show(function() {
    chrome.runtime.sendMessage({"city": $('#cityName').val()});
  });
});

$('#userLocation').click(function() {
  $('#loadingImage').show(function() {
    chrome.runtime.sendMessage({"userLocation": true});
    $('#loadingImage').hide();
  });
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  $('#cityName').val(changes["city"]["newValue"]);
});
