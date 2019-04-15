import axios from 'axios';
export interface Root {
  code: number;
  data: Data;
  message: string;
  notice: string;
  subcode: number;
  time: number;
  tips: string;
}

export interface Data {
  keyword: string;
  priority: number;
  qc: Qc[];
  semantic: Semantic;
  song: Semantic;
  tab: number;
  taglist: any[];
  totaltime: number;
  zhida: Zhida;
}

export interface Qc {
  text: Text;
  type: number;
}

export enum Text {
  周杰伦 = '周杰伦',
}

export interface Semantic {
  curnum: number;
  curpage: number;
  list: List[];
  totalnum: number;
}

export interface List {
  action: Action;
  album: Album;
  chinesesinger: number;
  desc: string;
  desc_hilight: string;
  docid: string;
  file: File;
  fnote: number;
  genre: number;
  grp?: List[];
  id: number;
  index_album: number;
  index_cd: number;
  interval: number;
  isonly: number;
  ksong: Ksong;
  language: number;
  lyric: string;
  lyric_hilight: string;
  mid: string;
  mv: Mv;
  name: string;
  newStatus: number;
  nt: number;
  pay: Pay;
  pure: number;
  singer: Singer[];
  status: number;
  subtitle: string;
  t: number;
  tag: number;
  time_public: Date;
  title: string;
  title_hilight: string;
  type: number;
  url: string;
  ver: number;
  volume: Volume;
}

export interface Action {
  alert: number;
  icons: number;
  msg: number;
  switch: number;
}

export interface Album {
  id: number;
  mid: string;
  name: string;
  subtitle: string;
  title: string;
  title_hilight: string;
}

export interface File {
  b_30s: number;
  e_30s: number;
  media_mid: string;
  size_128: number;
  size_320: number;
  size_aac: number;
  size_ape: number;
  size_dts: number;
  size_flac: number;
  size_ogg: number;
  size_try: number;
  strMediaMid: string;
  try_begin: number;
  try_end: number;
}

export interface Ksong {
  id: number;
  mid: string;
}

export interface Mv {
  id: number;
  vid: string;
}

export interface Pay {
  pay_down: number;
  pay_month: number;
  pay_play: number;
  pay_status: number;
  price_album: number;
  price_track: number;
  time_free: number;
}

export interface Singer {
  id: number;
  mid: Mid;
  name: Text;
  title: Text;
  title_hilight: Text;
  type: number;
  uin: number;
}

export enum Mid {
  The0025NhlN2YWrP4 = '0025NhlN2yWrP4',
}

export interface Volume {
  gain: number;
  lra: number;
  peak: number;
}

export interface Zhida {
  type: number;
  zhida_singer: ZhidaSinger;
}

export interface ZhidaSinger {
  albumNum: number;
  hotalbum: Hotalbum[];
  hotsong: Hotsong[];
  mvNum: number;
  singerID: number;
  singerMID: Mid;
  singerName: Text;
  singerPic: string;
  singername_hilight: Text;
  songNum: number;
}

export interface Hotalbum {
  albumID: number;
  albumMID: string;
  albumName: string;
  albumname_hilight: string;
}

export interface Hotsong {
  f: string;
  songID: number;
  songMID: string;
  songName: string;
  songname_hilight: string;
}

export default async (q: string, p = 0, n = 10) => {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp';
  const { data } = await axios.get<Root>(url, {
    params: {
      p: +p + 1,
      t: '0',
      n,
      w: q,
      format: 'json',
      outCharset: 'utf-8',
      new_json: 1,
      cr: '1',
    },
  });
  console.log(JSON.stringify(data, null, 2));
  return data.data.song.list.map(song => ({
    id: song.mid,
    name: song.name,
    album: {
      id: song.album.mid,
      name: song.album.name,
    },
    singers: song.singer.map(singer => ({ id: singer.mid, name: singer.name })),
  }));
};
