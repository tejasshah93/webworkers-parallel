self.addEventListener('message', function(e) {
  fetch(e.data.url, function(xhr) {
    var result = xhr.responseText;
    var object = JSON.parse(result);
    //set different timeout just to add some latency
    if(e.data.id == 1) {
      setTimeout(function() {
        sendback();
      }, 2000);
    }
    else if (e.data.id == 2) {
      setTimeout(function() {
        sendback();
      }, 5000);
    }
    //pass JSON object back as string
    function sendback(){
      self.postMessage(JSON.stringify(object));
    }
  });

}, false);


//simple XHR request in pure raw JavaScript
function fetch(url, callback) {
  console.log("url" + url);
  var xhr = new XMLHttpRequest();

  //xhr.addEventListener("progress", updateProgress, false);
  xhr.addEventListener("error", transferFailed, false);
  xhr.addEventListener("abort", transferCanceled, false);

  xhr.open("GET", url, true);

  xhr.addEventListener("load", function () {
    if (xhr.status == 200 && xhr.readyState == 4) {
      callback(xhr);
    }
    else {
      return;
    }
  }, false);
  xhr.send();

  function transferFailed(evt) {
    console.log("An error occurred while loading the file.");
  }

  function transferCanceled(evt) {
    console.log("The file loading has been canceled by the user.");
  }
}
