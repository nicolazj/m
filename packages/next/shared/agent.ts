import axios from 'axios';

export const _axios = axios.create({
  baseURL: 'http://localhost:4000/api',
});

async function search(q: string) {
  const { data } = await _axios.get(`/search?q=${q}`);
  return data;
}

async function cred() {
  const { data } = await _axios.get(`/vendor/qq/cred`);
  return data;
}

async function lyric_by_id(q: string) {
  const { data } = await _axios.get(`/lyric/by_id?q=${q}`);
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
