export interface Audio {
  play: (url: string) => void;
  pause: () => void;
  onPlay: (callback: () => void) => void;
  onPause: (callback: () => void) => void;
  onEnded: (callback: () => void) => void;
  onTimeUpdate(callback: (n: number) => void): void;
}
let _audio = document.createElement('audio');
document.body.appendChild(_audio);

function play(url: string) {
  _audio.src = url;
  _audio.play();
}
function pause() {
  if (_audio.paused) {
    _audio.play();
  } else _audio.pause();
}
function onPlay(callback: () => void) {
  _audio.addEventListener('play', callback);
}
function onEnded(callback: () => void) {
  _audio.addEventListener('ended', callback);
}
function onPause(callback: () => void) {
  _audio.addEventListener('pause', callback);
}
function onTimeUpdate(callack: (n: number) => void) {
  _audio.addEventListener('timeupdate', e => {
    callack(_audio.duration ? _audio.currentTime / _audio.duration : 0);
  });
}
const audio: Audio = {
  play,
  pause,
  onEnded,
  onPlay,
  onPause,
  onTimeUpdate,
};
export default audio;
