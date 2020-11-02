let playingAudio = false;

function onToggleAudio() {
  const btn = document.getElementById("btn-audio");
  btn.classList.toggle("btn-audio-on");

  const audio = document.getElementById("vcb-audio");
  playingAudio ? audio.pause() : audio.play()
  playingAudio = !playingAudio
}

function onToggleText() {
  var texts = document.getElementById("vcb-txts");
  texts.classList.toggle("vcb-txts-show");

  const btn = document.getElementById("btn-text");
  btn.classList.toggle("btn-txt-on");

}
