window.onload = function(e){ 
var promise = document.getElementById('audio').play();

if (promise !== undefined) {
    promise.catch(error => {
      document.getElementById('playBtn').classList.remove("hidden");
      document.getElementById('playBtn').onclick = function() {
        document.getElementById('audio').play();
      }
    }).then(() => {

    });
}
}
