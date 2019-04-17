import axios from 'axios';

export interface Root {
  code: number;
  subcode: number;
  message: string;
  default: number;
  data: Data;
}

export interface Data {
  uin: number;
  categoryId: number;
  sortId: number;
  sum: number;
  sin: number;
  ein: number;
  list: List[];
}

export interface List {
  dissid: string;
  createtime: Date;
  commit_time: Date;
  dissname: string;
  imgurl: string;
  introduction: string;
  listennum: number;
  score: number;
  version: number;
  creator: Creator;
}

export interface Creator {
  type: number;
  qq: number;
  encrypt_uin: string;
  name: string;
  isVip: number;
  avatarUrl: string;
  followflag: number;
}
export default async () => {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';

  const { data } = await axios.get<Root>(url, {
    params: {
      categoryId: 10000000,
      sin: 0,
      ein: 999,
      format: 'json',
      outCharset: 'utf-8',
    },
    headers: {
      Referer: 'https://y.qq.com/portal/playlist.html',
    },
  });
  console.log(data);
  return data.data.list.map(list => ({
    id: list.dissid,
    name: list.dissname,
    pic: list.imgurl,
  }));
};
