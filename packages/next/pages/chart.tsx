import { NextSFC } from 'next/index';
import React from 'react';

import Songlist from '../shared/components/Songlist';
import { ContentSpacing, SubText, Text } from '../shared/primitive';
import { playlistR } from '../shared/resources';

interface Song {
  id: string;
  name: string;
}
interface Props {
  playlist: Song[];
}

const Chart: NextSFC<Props> = ({ playlist }) => (
  <ContentSpacing>
    <div>
      <div />
      <div>
        <Songlist songs={playlist} />
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
