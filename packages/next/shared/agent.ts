import axios from 'axios';

const __DEV__ = process.env.NODE_ENV === 'development';
export const instance = axios.create({
  baseURL: __DEV__ ? 'http://localhost:4000/api' : '/api',
});

async function search(q: string) {
  const { data } = await instance.get(`/search?q=${q}`);
  return data;
}

async function cred() {
  const { data } = await instance.get(`/vendor/qq/cred`);
  return data;
}

async function lyric_by_id(q: string) {
  const { data } = await instance.get(`/lyric/by_id?q=${q}`);
  return data;
}

export default {
  vendor: {
    qq: {
      cred,
    },
  },
  search,
  lyric: {
    by_id: lyric_by_id,
  },
};
