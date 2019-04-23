import NextSeo from 'next-seo';
import { NextSFC } from 'next/index';
import React from 'react';
import styled from 'styled-components';

import AlbumList from '../shared/components/AlbumList';
import ArtistList from '../shared/components/ArtistList';
import PlayButton from '../shared/components/PlayButton';
import SongList from '../shared/components/SongList';
import { Cell, ContentSpacing, Grid, H1, Img, Square, Text } from '../shared/primitive';
import { artistR } from '../shared/resources';
import { T_Album, T_Singer, T_Song } from '@m/shared/dist/types';

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

const Img_ = styled(Img)({
  width: '100%',
  position: 'absolute',
  top: 0,
});
const Artist: NextSFC<Props> = ({ albums, songs, relatedArtists, artistId, info }) => (
  <ContentSpacing>
    <NextSeo
      config={{
        title: `${info.name}`,
        description: info.intro,
      }}
    />
    <Grid>
      <Cell width={[1, 1, 1, 1 / 3]}>
        <Grid>
          <Cell width={[1 / 2, 1 / 2, 1 / 2, 1]}>
            <Square>
              <Img_ src={`//y.gtimg.cn/music/photo_new/T001R800x800M000${artistId}.jpg`} />
            </Square>
          </Cell>
          <Cell width={[1 / 2, 1 / 2, 1 / 2, 1]}>
            <H1>{info.name}</H1>
            <PlayButton songs={songs} />
            <div>
              <Text>{info.intro.split('。')[0]}</Text>
            </div>
          </Cell>
        </Grid>
      </Cell>
      <Cell width={[1, 1, 1, 2 / 3]}>
        <SongList songs={songs} />
      </Cell>
    </Grid>

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
