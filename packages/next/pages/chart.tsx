import { NextSFC } from 'next/index';
import React from 'react';

import SongList from '../shared/components/SongList';
import { ContentSpacing } from '../shared/primitive';
import { playlistR } from '../shared/resources';
import { T_Song } from '../shared/types';

interface Props {
  playlist: T_Song[];
}

const Chart: NextSFC<Props> = ({ playlist }) => (
  <ContentSpacing>
    <div>
      <div />
      <div>
        <SongList songs={playlist} />
      </div>
    </div>
  </ContentSpacing>
);

Chart.getInitialProps = async ({ query: { q } }) => {
  let res = await playlistR.read(q);

  return {
    playlist: res,
  };
};

export default Chart;
