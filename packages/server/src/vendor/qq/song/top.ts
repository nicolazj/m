import axios from 'axios';

export interface Root {
  detail: Detail;
  code: number;
  ts: number;
}

export interface Detail {
  data: DetailData;
  code: number;
}

export interface DetailData {
  data: DataData;
  songInfoList: SongInfoList[];
}

export interface DataData {
  topId: number;
  recType: number;
  topType: number;
  updateType: number;
  title: string;
  titleDetail: string;
  titleShare: string;
  titleSub: string;
  intro: string;
  cornerMark: number;
  period: string;
  updateTime: Date;
  history: History;
  listenNum: number;
  totalNum: number;
  song: Song[];
  headPicUrl: string;
  frontPicUrl: string;
  mbFrontPicUrl: string;
  mbHeadPicUrl: string;
  pcSubTopIds: any[];
  pcSubTopTitles: any[];
  subTopIds: any[];
  adJumpUrl: string;
  h5JumpUrl: string;
  h5JumpKey: string;
  h5JumpParam: string;
  tjreport: string;
  rt: number;
}

export interface History {
  year: number[];
  subPeriod: Array<number[]>;
}

export interface Song {
  rank: number;
  rankType: number;
  rankValue: string;
  recType: number;
  songId: number;
  vid: string;
  albumMid: string;
  title: string;
  singerName: string;
  singerMid: string;
}

export interface SongInfoList {
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

export default async (id: string) => {
  console.log('id', id);
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';

  const { data } = await axios.get<Root>(url, {
    params: {
      format: 'json',
      outCharset: 'utf-8',
      data: {
        detail: {
          module: 'musicToplist.ToplistInfoServer',
          method: 'GetDetail',
          param: { topId: +id, offset: 0, num: 20 },
        },
        comm: { ct: 24, cv: 0 },
      },
    },
  });
  console.log(data);
  return data.detail.data.songInfoList.map(song => ({
    name: song.name,
    id: song.mid,
    album: {
      id: song.album.mid,
      name: song.album.name,
    },
    singers: song.singer.map(singer => ({
      id: singer.mid,
      name: singer.name,
    })),
  }));
};
