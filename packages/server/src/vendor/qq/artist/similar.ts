import axios from 'axios';

export interface Root {
  singers: Singers;
}

export interface Singers {
  hasmore: number;
  items: Item[];
}

export interface Item {
  id: number;
  mid: string;
  name: string;
  pic: string;
}

export default async (artistId: string, n = 5) => {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_simsinger.fcg';
  const { data } = await axios.get<Root>(url, {
    params: {
      utf8: '1',
      singer_mid: artistId,
      start: 0,
      num: n,
      format: 'json',
      outCharset: 'utf-8',
    },
  });
  return data.singers.items.map(singer => ({
    id: singer.mid,
    name: singer.name,
    pic: singer.pic,
  }));
};
