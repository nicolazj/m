import NextSeo from 'next-seo';
import { NextSFC } from 'next/index';
import React from 'react';

import AlbumList from '../shared/components/AlbumList';
import ArtistList from '../shared/components/ArtistList';
import PlayButton from '../shared/components/PlayButton';
import SongList from '../shared/components/SongList';
import {
  ContentSpacing,
  H1,
  Square,
  Text,
  CoverImg,
} from '../shared/primitive';
import { artistR } from '../shared/resources';
import { T_Album, T_Singer, T_Song } from '@m/shared/dist/types';
import PageLayout from '../shared/components/PageLayout';

interface Props {
  albums: T_Album[];
  songs: T_Song[];
  relatedArtists: T_Singer[];
  artistId: string;
  info: {
    name: string;
    intro: string;
  };
}

const Artist: NextSFC<Props> = ({
  albums,
  songs,
  relatedArtists,
  artistId,
  info,
}) => (
  <ContentSpacing>
    <NextSeo
      config={{
        title: `${info.name}`,
        description: info.intro,
      }}
    />

    <PageLayout
      head={
        <Square>
          <CoverImg
            src={`//y.gtimg.cn/music/photo_new/T001R800x800M000${artistId}.jpg`}
          />
        </Square>
      }
      subHead={
        <>
          <H1>{info.name}</H1>
          <PlayButton songs={songs} />
          <div>
            <Text>{info.intro.split('。')[0]}</Text>
          </div>
        </>
      }
      body={<SongList songs={songs} />}
    />

    <H1>专辑</H1>
    <AlbumList albums={albums} />
    <H1>相关艺术家</H1>
    <ArtistList artists={relatedArtists} />
  </ContentSpacing>
);

Artist.getInitialProps = async ({ query: { q } }) => {
  let res = await artistR.read(q);

  return { ...res, artistId: q };
};

export default Artist;
