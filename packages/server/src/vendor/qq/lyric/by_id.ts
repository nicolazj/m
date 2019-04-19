import axios from 'axios';
import song_by_id from '../song/by_id';
import he from 'he';
import lrc from 'lrc.js';
export interface Root {
  retcode: number;
  code: number;
  subcode: number;
  type: number;
  songt: number;
  lyric: string;
}

export default async (songId: string) => {
  const { id2 } = await song_by_id(songId);

  const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg';
  const { data } = await axios.get<Root>(url, {
    params: {
      format: 'jsonp',
      outCharset: 'utf-8',
      needNewCode: '1',
      nobase64: '1',
      musicid: id2,
      songtype: 0,
      jsonpCallback: 'p',
    },
    headers: {
      Referer: 'https://y.qq.com/portal/playlist.html',
    },
    transformResponse: data => {
      const p = (t: any) => t;

      return eval(data);
    },
  });

  return lrc.parse(he.decode(data.lyric));
};
