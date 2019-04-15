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
  singer: Singer;
  tab: number;
  taglist: any[];
  totaltime: number;
  zhida: Zhida;
}

export interface Qc {
  text: string;
  type: number;
}

export interface Singer {
  curnum: number;
  curpage: number;
  list: List[];
  totalnum: number;
}

export interface List {
  albumNum: number;
  big_photo_flag: string;
  docid: string;
  has_photo: number;
  mvNum: number;
  photo_cnt: number;
  singerID: number;
  singerMID: string;
  singerName: string;
  singerName_hilight: string;
  singerPic: string;
  songNum: number;
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
  singerMID: string;
  singerName: string;
  singerPic: string;
  singername_hilight: string;
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
      t: '9',
      n,
      w: q,
      format: 'json',
      outCharset: 'utf-8',
      cr: '1',
    },
  });
  return data.data.singer.list.map(singer => ({
    id: singer.singerMID,
    name: singer.singerName,
  }));
};
