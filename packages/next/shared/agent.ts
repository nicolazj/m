import axios from 'axios';

import { T_Lyric, T_QQCred, T_SearchResult } from '@m/shared/dist/types';

import { isDev } from './constants';

export const _axios = axios.create({
  baseURL: isDev ? 'http://192.168.1.8:4000/api' : '/api',
});

async function search(q: string) {
  const { data } = await _axios.get<T_SearchResult>(`/search?q=${q}`);
  return data;
}

async function cred() {
  const { data } = await _axios.get<T_QQCred>(`/vendor/qq/cred`);
  return data;
}

async function lyric_by_id(q: string) {
  const { data } = await _axios.get<T_Lyric>(`/lyric/by_id?q=${q}`);
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
