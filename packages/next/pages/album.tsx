import NextSeo from 'next-seo';
import { NextSFC } from 'next/index';
import Link from 'next/link';
import React from 'react';

import PlayButton from '../shared/components/PlayButton';
import SongList from '../shared/components/SongList';
import {
  A,
  ContentSpacing,
  H1,
  Square,
  SubText,
  CoverImg,
} from '../shared/primitive';
import { albumR } from '../shared/resources';
import { T_Album } from '@m/shared/dist/types';
import PageLayout from '../shared/components/PageLayout';
interface Props {
  album: T_Album;
}

const Album: NextSFC<Props> = ({ album }) => (
  <ContentSpacing>
    <NextSeo
      config={{
        title: `${album.name} - ${album.singer.name}`,
        description: album.desc,
      }}
    />
    <PageLayout
      head={
        <Square>
          <CoverImg
            src={`//y.gtimg.cn/music/photo_new/T002R800x800M000${album.id}.jpg`}
          />
        </Square>
      }
      subHead={
        <>
          <H1>{album.name}</H1>
          <Link
            href={`/artist?q=${album.singer.id}`}
            as={`/artist/${album.singer.id}`}
          >
            <SubText as={A}>{album.singer.name}</SubText>
          </Link>
          <div>
            <SubText>{album.releasedAt}</SubText>
          </div>
          <PlayButton songs={album.songs} />
        </>
      }
      body={<SongList songs={album.songs} />}
    />
  </ContentSpacing>
);

Album.getInitialProps = async ({ query: { q } }) => {
  let res = await albumR.read(q);

  return { album: res, albumId: q ? q.toString() : '' };
};

export default Album;
