import { NextSFC } from 'next/index';
import Link from 'next/link';
import React from 'react';

import { ContentSpacing, H1, SubText, Text } from '../shared/primitive';
import { artistR } from '../shared/resources';
import { T_Album, T_Artist, T_Song } from '../shared/types';

interface Props {
  albums: T_Album[];
  songs: T_Song[];
  relatedArtists: T_Artist[];
}

const Artist: NextSFC<Props> = ({ albums, songs, relatedArtists }) => (
  <ContentSpacing>
    <H1>热门歌曲</H1>
    <div>
      {songs.map(song => (
        <Text key={song.id}>{song.name}</Text>
      ))}
    </div>
    <H1>专辑</H1>
    {albums.map(album => (
      <div key={album.id}>{album.name}</div>
    ))}

    <H1>相关艺术家</H1>
    {relatedArtists.map(artist => (
      <Link key={artist.id} href={`/artist?q=${artist.id}`} as={`/artist/${artist.id}`}>
        <Text as="a" key={artist.id}>
          {artist.name}
        </Text>
      </Link>
    ))}
  </ContentSpacing>
);

Artist.getInitialProps = async ({ query: { q } }) => {
  let res = await artistR.read(q);

  return res;
};

export default Artist;
