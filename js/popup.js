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
