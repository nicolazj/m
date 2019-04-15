import axios from 'axios';
import singer from '../search/singer';

export interface Root {
  songinfo: Songinfo;
  code: number;
  ts: number;
}

export interface Songinfo {
  data: Data;
  code: number;
}

export interface Data {
  info: Info;
  extras: Extras;
  track_info: TrackInfo;
}

export interface Extras {
  name: string;
  transname: string;
  subtitle: string;
  from: string;
}

export interface Info {
  genre: Genre;
  intro: Genre;
  lan: Genre;
  pub_time: Genre;
}

export interface Genre {
  title: string;
  type: string;
  content: Content[];
  pos: number;
  more: number;
  selected: string;
  use_platform: number;
}

export interface Content {
  id: number;
  value: string;
  mid: string;
  type: number;
  show_type: number;
  is_parent: number;
  picurl: string;
  read_cnt: number;
  author: string;
  jumpurl: string;
  ori_picurl: string;
}

export interface TrackInfo {
  id: number;
  type: number;
  mid: string;
  name: string;
  title: string;
  subtitle: string;
  singer: Singer[];
  album: Album;
  mv: Mv;
  interval: number;
  isonly: number;
  language: number;
  genre: number;
  index_cd: number;
  index_album: number;
  time_public: Date;
  status: number;
  fnote: number;
  file: File;
  pay: Pay;
  action: { [key: string]: number };
  ksong: Ksong;
  volume: Volume;
  label: string;
  url: string;
  bpm: number;
  version: number;
  trace: string;
  data_type: number;
  modify_stamp: number;
  pingpong: string;
}

export interface Album {
  id: number;
  mid: string;
  name: string;
  title: string;
  subtitle: string;
  time_public: Date;
}

export interface File {
  media_mid: string;
  size_24aac: number;
  size_48aac: number;
  size_96aac: number;
  size_192ogg: number;
  size_192aac: number;
  size_128mp3: number;
  size_320mp3: number;
  size_ape: number;
  size_flac: number;
  size_dts: number;
  size_try: number;
  try_begin: number;
  try_end: number;
  url: string;
  size_hires: number;
  hires_sample: number;
  hires_bitdepth: number;
  b_30s: number;
  e_30s: number;
}

export interface Ksong {
  id: number;
  mid: string;
}

export interface Mv {
  id: number;
  vid: string;
  name: string;
  title: string;
}

export interface Pay {
  pay_month: number;
  price_track: number;
  price_album: number;
  pay_play: number;
  pay_down: number;
  pay_status: number;
  time_free: number;
}

export interface Singer {
  id: number;
  mid: string;
  name: string;
  title: string;
  type: number;
  uin: number;
}

export interface Volume {
  gain: number;
  peak: number;
  lra: number;
}

export default async (songId: string) => {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
  const { data } = await axios.get<Root>(url, {
    params: {
      format: 'json',
      outCharset: 'utf-8',
      data: {
        songinfo: {
          method: 'get_song_detail_yqq',
          param: { song_type: 0, song_mid: songId },
          module: 'music.pf_song_detail_svr',
        },
      },
    },
  });

  return {
    id: data.songinfo.data.track_info.mid,
    name: data.songinfo.data.track_info.name,
    album: {
      id: data.songinfo.data.track_info.album.mid,
      name: data.songinfo.data.track_info.album.name,
    },
    singers: data.songinfo.data.track_info.singer.map(singer => ({
      id: singer.mid,
      name: singer.name,
    })),
  };
};
