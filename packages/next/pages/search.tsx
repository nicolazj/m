import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import agent from '../shared/agent';
import { H1, ContentSpacing } from '../shared/primitive';
import { T_Album, T_Singer, T_Song, T_Playlist, T_SearchResult } from '@m/shared/dist/types';
import ArtistList from '../shared/components/ArtistList';
import SongList from '../shared/components/SongList';
import AlbumList from '../shared/components/AlbumList';
import PlayListList from '../shared/components/PlayListList';

const SearchInput_ = styled.input({
  backgroundColor: '#282828',
  width: '100%',
  border: 'none',
  fontSize: 36,
  outline: 'none',
  padding: 24,
  caretColor: '#1db954',
  color: '#fff',
  height: 100,
});

const Search = () => {
  const [q, setQ] = useState('');
  const [quickResult, setquickResult] = useState<T_SearchResult>({
    songs: [],
    albums: [],
    singers: [],
    playlists: [],
  });

  useEffect(() => {
    let canceled = false;
    const search = async (q: string) => {
      const data = await agent.search(q);
      if (!canceled) {
        setquickResult(data);
      }
    };
    q.length && search(q);
    return () => {
      canceled = true;
    };
  }, [q]);

  const { songs, albums, singers, playlists } = quickResult;
  return (
    <div>
      <SearchInput_
        placeholder="搜索"
        onChange={e => {
          setQ(e.target.value);
        }}
      />

      <ContentSpacing>
        <H1>歌曲</H1>
        <SongList songs={songs} />
        <H1>专辑</H1>
        <AlbumList albums={albums} />
        <H1>艺术家</H1>
        <ArtistList artists={singers} />
        <H1>歌单</H1>
        <PlayListList playlists={playlists} />
      </ContentSpacing>
    </div>
  );
};

export default Search;
