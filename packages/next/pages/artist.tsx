import NextSeo from 'next-seo';
import { NextSFC } from 'next/index';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import AlbumList from '../shared/components/AlbumList';
import ArtistList from '../shared/components/ArtistList';
import SongList from '../shared/components/SongList';
import { ContentSpacing, H1, Img, SubText, Text } from '../shared/primitive';
import { artistR } from '../shared/resources';
import { T_Album, T_Artist, T_Song } from '../shared/types';

interface Props {
  albums: T_Album[];
  songs: T_Song[];
  relatedArtists: T_Artist[];
  artistId: string;
  info: {
    name: string;
    intro: string;
  };
}

const Hero = styled.div({
  display: 'flex',
  justifyContent: 'center',
  margin: 24,
});

const Img_ = styled(Img)({
  width: 400,
  height: 400,
});
const Artist: NextSFC<Props> = ({ albums, songs, relatedArtists, artistId, info }) => (
  <ContentSpacing>
    <NextSeo
      config={{
        title: `${info.name}`,
        description: info.intro,
      }}
    />
    <Hero>
      <Img_ src={`//y.gtimg.cn/music/photo_new/T001R800x800M000${artistId}.jpg`} />
    </Hero>
    <H1>热门歌曲</H1>
    <SongList songs={songs} />
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
