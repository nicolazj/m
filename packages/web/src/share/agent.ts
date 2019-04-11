import axios from 'axios';
import { Cred } from '@m/shared/dist/types';

const instance = axios.create({
  baseURL: '/api',
});

async function search(q: string) {
  const { data } = await instance.get(`/search?q=${q}`);
  return data;
}

async function cred() {
  const { data } = await instance.get<Cred>(`/vendor/qq/cred`);
  return data;
}
async function albums(artistID: string) {
  const { data } = await instance.get(`/album/by_artist?q=${artistID}`);
  return data;
}
async function songs(artistID: string) {
  const { data } = await instance.get(`/song/popular?q=${artistID}`);
  return data;
}
async function album(albumId: string) {
  const { data } = await instance.get(`/album/by_id?q=${albumId}`);
  return data;
}
async function songSearch(q: string) {
  const { data } = await instance.get(`/search/song?q=${q}`);
  return data;
}
async function albumSearch(q: string) {
  const { data } = await instance.get(`/search/album?q=${q}`);
  return data;
}
const newest = {
  songs: async () => {
    const { data } = await instance.get(`/song/newest`);
    return data;
  },
  album: async () => {
    const { data } = await instance.get(`/album/newest`);
    return data;
  },
};
export default {
  vendor: {
    qq: {
      cred,
    },
  },
  search,
  songSearch,
  albumSearch,
  artist: (artistID: string) => ({
    albums: async () => {
      const { data } = await instance.get(`/album/by_artist?q=${artistID}`);
      return data;
    },
    songs: async () => {
      const { data } = await instance.get(`/song/popular?q=${artistID}`);
      return data;
    },
    similar: async () => {
      const { data } = await instance.get(`/artist/similar?q=${artistID}`);
      return data;
    },
  }),
  album,
  newest,
};
