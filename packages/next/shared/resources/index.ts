import { instance } from '../agent';
import { createResource } from '../cache';

export const playlistR = createResource(async (q: string) => {
  const { data } = await instance.get(`/song/top?q=${q}`);
  return data;
});
export const artistR = createResource(async (artistId: string) => {
  const [{ data: albums }, { data: songs }, { data: relatedArtists }] = await Promise.all([
    instance.get(`/album/by_artist?q=${artistId}`),
    instance.get(`/song/popular?q=${artistId}`),
    instance.get(`/artist/similar?q=${artistId}`),
  ]);
  return { albums, songs, relatedArtists };
});
