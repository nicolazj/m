import axios from 'axios';
import album from './album';
import song from './song';
import singer from './singer';
import playlist from './playlist';

export default async (q: string) => {
  const [singers, songs, albums, playlists] = await Promise.all([
    singer(q, 0, 5),
    song(q, 0, 5),
    album(q, 0, 5),
    playlist(q, 0, 5),
  ]);

  return {
    albums,
    songs,
    singers,
    playlists,
  };
};
