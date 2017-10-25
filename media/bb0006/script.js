var promise = document.querySelector('audio').play();

if (promise !== undefined) {
    promise.catch(error => {
      document.getElementById('playBtn').onclick(function() {
        document.getElementById('audio').play();
      }
    }).then(() => {

    });
}
