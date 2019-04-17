import Link from 'next/link';
import { withRouter, WithRouterProps } from 'next/router';
import { margin, padding } from 'polished';
import React from 'react';
import styled from 'styled-components';

import { A, Text } from '../../primitive';

const UL_ = styled.ul({
  listStyle: 'none',
  display: 'flex',
  justifyContent: 'center',
});
const LI_ = styled.li<{ current?: boolean }>(({ current }) => ({
  ...margin(10),
  ...padding(5),
  borderBottomWidth: current ? 2 : 0,
  borderBottomColor: '#1db954',
  borderBottomStyle: 'solid',
}));

const A_ = styled(A)({
  ':hover': {
    textDecoration: 'none',
  },
});
const routes = [
  {
    route: '/',
    text: '排行榜',
  },
  {
    route: '/playlists',
    text: '歌单',
  },
];
const Nav: React.FC<WithRouterProps> = ({ router }) => {
  return (
    <nav>
      <UL_>
        {routes.map(route => (
          <LI_ key={route.route} current={router && router.route === route.route}>
            <Link href={route.route} prefetch>
              <Text as={A_}>{route.text}</Text>
            </Link>
          </LI_>
        ))}
      </UL_>
    </nav>
  );
};

export default withRouter(Nav);
