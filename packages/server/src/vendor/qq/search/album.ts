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
  album: Album;
  keyword: string;
  priority: number;
  qc: Qc[];
  tab: number;
  taglist: any[];
  totaltime: number;
  zhida: Zhida;
}

export interface Album {
  curnum: number;
  curpage: number;
  list: List[];
  totalnum: number;
}

export interface List {
  albumID: number;
  albumMID: string;
  albumName: string;
  albumName_hilight: string;
  albumPic: string;
  catch_song: string;
  docid: string;
  publicTime: Date;
  singerID: number;
  singerMID: string;
  singerName: string;
  singerName_hilight: string;
  singer_list: SingerList[];
  song_count: number;
  type: number;
}

export interface SingerList {
  id: number;
  mid: string;
  name: string;
  name_hilight: string;
}

export interface Qc {
  text: string;
  type: number;
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
      t: '8',
      n,
      w: q,
      format: 'json',
      outCharset: 'utf-8',
      cr: '1',
    },
  });
  return data.data.album.list.map(album => ({
    id: album.albumMID,
    name: album.albumName,
    singer: {
      id: album.singerMID,
      name: album.singerName,
    },
  }));
};
