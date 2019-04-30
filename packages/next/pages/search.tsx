import _debounce from 'lodash.debounce';
import { padding } from 'polished';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { T_SearchResult } from '@m/shared/dist/types';

import agent from '../shared/agent';
import AlbumList from '../shared/components/AlbumList';
import ArtistList from '../shared/components/ArtistList';
import PlayListList from '../shared/components/PlayListList';
import SongList from '../shared/components/SongList';
import { ContentSpacing, H1 } from '../shared/primitive';

const SearchInput_ = styled.input({
  backgroundColor: '#282828',
  width: '100%',
  border: 'none',
  fontSize: '2rem',
  outline: 'none',
  ...padding('1rem', '1rem'),
  caretColor: '#1db954',
  borderRadius: 0,
  color: '#fff',
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

  const handleInput = _debounce((q: string) => {
    setQ(q);
  }, 500);

  const { songs, albums, singers, playlists } = quickResult;
  return (
    <div>
      <SearchInput_
        placeholder="搜索"
        autoFocus
        onChange={e => handleInput(e.target.value)}
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
