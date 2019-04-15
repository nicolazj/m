import React from 'react';
import Link from 'next/link';
import { Text, A } from '../../primitive';
import styled from 'styled-components';

const Nav_ = styled.nav({
  display: 'flex',
  flexDirection: 'column',
});

const Nav = () => {
  return (
    <Nav_>
      <Link href="/">
        <Text as={A}>发现</Text>
      </Link>
      <Link href="/search">
        <Text as={A}>搜索</Text>
      </Link>
    </Nav_>
  );
};

export default Nav;
