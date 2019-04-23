import agent from '../agent';
import Audio from './audio';
import { T_Track } from '@m/shared/dist/types';

abstract class Vendor {
  abstract getURL(info: T_Track): string;
}

class QQMusic extends Vendor {
  private guid: string = '';
  private vkey: string = '';
  constructor() {
    super();
    this.init();
  }
  async init() {
    const { guid, vkey } = await agent.vendor.qq.cred();
    this.guid = guid;
    this.vkey = vkey;
  }
  getURL(info: T_Track) {
    return `http://dl.stream.qqmusic.qq.com/C400${info.song.id}.m4a?guid=${this.guid}&vkey=${
      this.vkey
    }&uin=0&fromtag=38`;
  }
}

interface PlayerStatus {
  duration: number;
  currentTime: number;
  playing: boolean;
  list: T_Track[];
  cur: number;
}
interface PlayerListener {
  (playerInfo: PlayerStatus): void;
}

class Player {
  private vendors: { [id: string]: Vendor } = {};
  private _audio: Audio;

  private listeners: PlayerListener[] = [];

  public state: PlayerStatus = {
    playing: false,
    duration: 0,
    currentTime: 0,
    list: [],
    cur: -1,
  };
  constructor() {
    this.vendors['qq'] = new QQMusic();

    const audio = new Audio();
    audio.onPlay(() => {
      this.state.playing = true;
      this.update();
    });
    audio.onPause(() => {
      this.state.playing = false;
      this.update();
    });
    audio.onTimeUpdate((duration, currentTime) => {
      this.state.duration = duration;
      this.state.currentTime = currentTime;
      this.update();
    });
    audio.onEnded(this.skipForward.bind(this));
    this._audio = audio;
  }

  _play(cur: number) {
    const track = this.state.list[cur];
    const vendor = track.vendor;
    const url = this.vendors[vendor].getURL(track);
    this._audio.play(url);
    this.state.cur = cur;
  }

  playList(tracks: T_Track[]) {
    this.state.list = tracks;
    this._play(0);
  }
  play(track: T_Track) {
    this.state.list.push(track);
    this._play(this.state.list.length - 1);
  }
  skipForward() {
    this._play((this.state.cur + 1) % this.state.list.length);
  }
  skipBack() {
    this._play((this.state.cur + this.state.list.length - 1) % this.state.list.length);
  }
  pause() {
    this._audio.pause();
  }

  subscribe(listener: PlayerListener) {
    this.listeners.push(listener);

    return () => {
      const idx = this.listeners.indexOf(listener);
      this.listeners.splice(idx, 1);
    };
  }
  update() {
    this.listeners.map(listener => {
      listener(this.state);
    });
  }
}

export default Player;
