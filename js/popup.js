$(document).ready(function() {
  chrome.storage.local.get("city", function(result) {
    $('#cityName').val(result.city);
    $('#loadingImage').hide();
  });
});

function onClicked(id, getMessage) {
  $('#' + id).click(function() {
    $('#errorText').hide();
    $('#loadingImage').show(function() {
      chrome.runtime.sendMessage(getMessage());
    });
  });
}

onClicked("startButton", function() {
  return {"city": $('#cityName').val()};
});

onClicked("userLocation", function() {
  return {"userLocation": true};
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  $('#cityName').val(changes.city.newValue);
  $('#loadingImage').hide();
});
