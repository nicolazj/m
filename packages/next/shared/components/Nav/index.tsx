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
  padding: 0,
});
const LI_ = styled.li<{ current?: boolean }>(({ current }) => ({
  ...margin(10),
  ...padding(10),
  borderBottomWidth: 2,
  borderBottomColor: current ? '#1db954' : 'transparent',
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
  {
    route: '/new',
    text: '新专辑',
  },
];
const Nav: React.FC<WithRouterProps> = ({ router }) => {
  return (
    <nav>
      <UL_>
        {routes.map(route => (
          <LI_
            key={route.route}
            current={router && router.route === route.route}
          >
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
