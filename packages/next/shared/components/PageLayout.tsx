import React from 'react';
import { Grid, Cell } from '../primitive';

interface Props {
  head: React.ReactNode;
  subHead: React.ReactNode;
  body: React.ReactNode;
}
const PageLayout: React.FC<Props> = ({ head, subHead, body }) => {
  return (
    <Grid>
      <Cell width={[1, 1, 1, 1 / 3]}>
        <Grid>
          <Cell width={[1, 1 / 2, 1 / 2, 1]}>{head}</Cell>
          <Cell width={[1, 1 / 2, 1 / 2, 1]}>{subHead}</Cell>
        </Grid>
      </Cell>
      <Cell width={[1, 1, 1, 2 / 3]}>{body}</Cell>
    </Grid>
  );
};

export default PageLayout;
