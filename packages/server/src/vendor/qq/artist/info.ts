import axios from 'axios';
import convert from 'xml-js';
export default async (artistId: string) => {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_singer_desc.fcg';
  const { data } = await axios.get(url, {
    params: {
      singermid: artistId,

      utf8: 1,
      outCharset: 'utf-8',
      format: 'xml',
    },
    headers: {
      Referer: 'https://c.y.qq.com/xhr_proxy_utf8.html',
    },
  });
  return convert.xml2json(data, { compact: true });
};
