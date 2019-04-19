import axios from 'axios';

export interface Root {
  code: number;
  subcode: number;
  message: string;
  default: number;
  data: Data;
}

export interface Data {
  display_num: number;
  list: List[];
  num_per_page: number;
  page_no: number;
  qc: any[];
  sum: number;
  uin: number;
}

export interface List {
  copyrightnum: number;
  createtime: Date;
  creator: Creator;
  diss_status: number;
  dissid: string;
  dissname: string;
  docid: number;
  imgurl: string;
  introduction: string;
  listennum: number;
  score: number;
  song_count: number;
}

export interface Creator {
  avatarUrl: string;
  creator_uin: string;
  encrypt_uin: string;
  followflag: number;
  isVip: number;
  name: string;
  qq: number;
  singerid: number;
  singermid: string;
  type: number;
}

export default async (q: string, p = 0, n = 10) => {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/client_music_search_songlist';

  const { data } = await axios.get<Root>(url, {
    params: {
      page_no: p,
      num_per_page: n,
      query: q,
      format: 'json',
      outCharset: 'utf-8',
    },
    headers: {
      Referer: 'https://y.qq.com/portal/search.html',
    },
  });
  return data.data.list.map(playlist => ({
    id: playlist.dissid,
    name: playlist.dissname,
    pic: playlist.imgurl,
  }));
};
