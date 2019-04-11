import axios from 'axios';
export default async (q: string, p = 0, n = 10) => {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp';
  const { data } = await axios.get(url, {
    params: {
      p: +p + 1,
      t: '0',
      n,
      w: q,
      format: 'json',
      outCharset: 'utf-8',
      cr: '1',
    },
  });
  return data.data;
};
