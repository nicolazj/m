import { RootObject } from './by_id';
import axios from 'axios';

export interface CompanyNew {
  brief: string;
  headPic: string;
  id: number;
  is_show: number;
  name: string;
}

export interface Pay {
  payalbum: number;
  payalbumprice: number;
  paydownload: number;
  payinfo: number;
  payplay: number;
  paytrackmouth: number;
  paytrackprice: number;
  timefree: number;
}

export interface Preview {
  trybegin: number;
  tryend: number;
  trysize: number;
}

export interface Singer {
  id: number;
  mid: string;
  name: string;
}

export interface Song {
  albumdesc: string;
  albumid: number;
  albummid: string;
  albumname: string;
  alertid: number;
  belongCD: number;
  cdIdx: number;
  interval: number;
  isonly: number;
  label: string;
  msgid: number;
  pay: Pay;
  preview: Preview;
  rate: number;
  singer: Singer[];
  size128: number;
  size320: number;
  size5_1: number;
  sizeape: number;
  sizeflac: number;
  sizeogg: number;
  songid: number;
  songmid: string;
  songname: string;
  songorig: string;
  songtype: number;
  strMediaMid: string;
  stream: number;
  switch: number;
  type: number;
  vid: string;
}

export interface RootObject {
  aDate: string;
  albumTips: string;
  color: number;
  company: string;
  company_new: CompanyNew;
  cur_song_num: number;
  desc: string;
  genre: string;
  id: number;
  lan: string;
  list: Song[];
  mid: string;
  name: string;
  radio_anchor: number;
  singerid: number;
  singermblog?: any;
  singermid: string;
  singername: string;
  song_begin: number;
  total: number;
  total_song_num: number;
}

export default async (albumId: string) => {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg';

  const {
    data: { data },
  } = await axios.get<{ data: RootObject }>(url, {
    params: {
      albummid: albumId,
      format: 'json',
      outCharset: 'utf-8',
    },
  });

  const songs = data.list.map(s => ({
    id: s.songmid,
    name: s.songname,

    album: {
      id: s.albummid,
      name: s.albumname,
    },
    singers: s.singer.map(sg => ({
      id: sg.mid,
      name: sg.name,
    })),
  }));

  return {
    id: data.mid,
    desc: data.desc,
    name: data.name,
    releasedAt: data.aDate,
    singer: {
      id: data.singermid,
      name: data.singername,
    },
    songs,
  };
};
