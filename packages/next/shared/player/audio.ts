class Audio {
  private _audio: HTMLAudioElement;
  constructor() {
    let _audio = document.createElement('audio');
    document.body.appendChild(_audio);
    this._audio = _audio;
  }

  play(url: string) {
    this._audio.src = url;
    this._audio.play();
  }
  pause() {
    if (this._audio.paused) {
      this._audio.play();
    } else this._audio.pause();
  }
  onPlay(callback: () => void) {
    this._audio.addEventListener('play', callback);
  }
  onEnded(callback: () => void) {
    this._audio.addEventListener('ended', callback);
  }
  onPause(callback: () => void) {
    this._audio.addEventListener('pause', callback);
  }
  onTimeUpdate(callack: (duration: number, currentTime: number) => void) {
    this._audio.addEventListener('timeupdate', () => {
      const { duration, currentTime } = this._audio;
      callack(duration, currentTime);
    });
  }
}
export default Audio;
