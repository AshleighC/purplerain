$(document).ready(function() {
  chrome.storage.local.get("city", function(result) {
    $('#cityName').val(result.city);
  });
});

$('#startButton').click(function() {
  chrome.runtime.sendMessage({"city": $('#cityName').val()});
});
