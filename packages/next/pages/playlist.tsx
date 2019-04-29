import NextSeo from 'next-seo';
import { NextSFC } from 'next/index';
import React from 'react';

import PlayButton from '../shared/components/PlayButton';
import SongList from '../shared/components/SongList';
import { ContentSpacing, H1, Square, CoverImg } from '../shared/primitive';
import { playlistR } from '../shared/resources';
import { T_Song } from '@m/shared/dist/types';
import PageLayout from '../shared/components/PageLayout';

interface Props {
  songs: T_Song[];
  desc: string;
  id: string;
  name: string;
  pic: string;
}
const Playlist: NextSFC<Props> = ({ songs, name, pic, desc }) => (
  <ContentSpacing>
    <NextSeo
      config={{
        title: `${name}`,
        description: desc,
      }}
    />

    <PageLayout
      head={
        <Square>
          <CoverImg src={pic} />
        </Square>
      }
      subHead={
        <>
          <H1>{name}</H1>
          <PlayButton songs={songs} />
        </>
      }
      body={<SongList songs={songs} />}
    />
  </ContentSpacing>
);

Playlist.getInitialProps = async ({ query: { q } }) => {
  let res = await playlistR.read(q);

  return res;
};

export default Playlist;
