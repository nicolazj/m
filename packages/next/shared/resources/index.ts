import { _axios } from '../agent';
import { createResource } from '../cache';

export const rankR = createResource(async (q: string) => {
  const { data } = await _axios.get(`/song/top?q=${q}`);
  return data;
});
export const playlistsR = createResource(async () => {
  const { data } = await _axios.get(`/playlist/hot`);
  return data;
});

export const playlistR = createResource(async (q: string) => {
  const { data } = await _axios.get(`/playlist/by_id?q=${q}`);
  return data;
});
export const artistR = createResource(async (artistId: string) => {
  const [{ data: albums }, { data: songs }, { data: relatedArtists }, { data: info }] = await Promise.all([
    _axios.get(`/album/by_artist?q=${artistId}`),
    _axios.get(`/song/popular?q=${artistId}`),
    _axios.get(`/artist/similar?q=${artistId}`),
    _axios.get(`/artist/info?q=${artistId}`),
  ]);
  return { albums, songs, relatedArtists, info };
});
export const albumR = createResource(async (q: string) => {
  const { data } = await _axios.get(`/album/by_id?q=${q}`);
  return data;
});
export const newAlbumR = createResource(async () => {
  const { data } = await _axios.get(`/album/newest`);
  return data;
});
