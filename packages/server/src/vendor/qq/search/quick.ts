import axios from 'axios';
import album from './album';
import song from './song';
import singer from './singer';
export interface Root {
  code: number;
  data: Data;
  subcode: number;
}

export interface Data {
  album: Album;
  mv: Album;
  singer: Album;
  song: Album;
}

export interface Album {
  count: number;
  itemlist: Itemlist[];
  name: string;
  order: number;
  type: number;
}

export interface Itemlist {
  docid: string;
  id: string;
  mid: string;
  name: string;
  pic?: string;
  singer: string;
  vid?: string;
}

// export default async (q: string) => {
//   const url = 'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg';

//   const { data } = await axios.get<Root>(url, {
//     params: {
//       key: q,
//       format: 'json',
//     },
//   });

//   return {
//     albums: data.data.album.itemlist.map(album => ({ id: album.mid, name: album.name })),
//     songs: data.data.song.itemlist.map(song => ({ id: song.mid, name: song.name })),
//     singers: data.data.singer.itemlist.map(singer => ({ id: singer.mid, name: singer.name })),
//   };
// };

export default async (q: string) => {
  const [singers, songs, albums] = await Promise.all([
    singer(q, 0, 5),
    song(q, 0, 5),
    album(q, 0, 5),
  ]);

  return {
    albums,
    songs,
    singers,
  };
};
