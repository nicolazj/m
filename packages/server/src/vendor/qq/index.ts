import search from './search';
import album from './album';
import artist from './artist';
import song from './song';
import cred from './cred';
import axios from 'axios';
import console = require('console');

console.log('123');
// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    console.log(error);
    // Do something with response error
    return Promise.reject(error);
  }
);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const QQ = {
  search,
  album,
  artist,
  song,
  cred,
};

function logify<T>(o: T, f = ''): T {
  const r = {} as any;
  for (let field in o) {
    let v = o[field];

    if (typeof v === 'function') {
      r[field] = async function(...args: any[]) {
        const t1 = Date.now();
        // FIXME
        const r = await ((v as unknown) as Function)(...args);
        const t2 = Date.now();
        console.log(`time:${t2 - t1}ms --> ${f}/${field}`);

        return r;
      };
    } else {
      r[field] = logify(v, `${f}/${field}`);
    }
  }
  return r;
}

export default logify(QQ);
