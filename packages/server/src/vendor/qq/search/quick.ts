import axios from 'axios';
export default async (q: string) => {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg';

  const { data } = await axios.get(url, {
    params: {
      key: q,
      format: 'json',
    },
  });

  const r: any = {};
  for (let key in data.data) {
    r[key] = data.data[key].itemlist.map((i: any) => ({
      name: i.name,
      id: i.mid,
      pic: i.pic,
      singer: i.singer,
    }));
  }
  return r;
};
