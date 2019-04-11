import axios from 'axios';

export interface Root {
  code: number;
  data: Data;
  message: string;
  subcode: number;
}

export interface Data {
  list: List[];
  singer_id: string;
  singer_mid: string;
  singer_name: string;
  total: number;
}

export interface List {
  Flisten_count1: number;
  Fupload_time: Date;
  index: number;
  isnew: number;
  listenCount: number;
  musicData: MusicData;
  playurl: string;
  price: number;
  vid: Vid;
}

export interface MusicData {
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

export interface Vid {
  Fmv_id: string;
  Fstatus: string;
  Fvid: string;
}

export default async (artistId: string, p = 0, n = 10) => {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';

  const { data } = await axios.get<Root>(url, {
    params: {
      singermid: artistId,
      order: 'listen',
      begin: p * n,
      num: n,
      format: 'json',
      outCharset: 'utf-8',
    },
  });

  return data.data.list.map(song => {
    const m = song.musicData;
    return {
      id: m.songmid,
      name: m.songname,
      album: {
        id: m.albummid,
        name: m.albumname,
      },
      singers: m.singer.map(singer => ({
        id: singer.mid,
        name: singer.name,
      })),
    };
  });
};
