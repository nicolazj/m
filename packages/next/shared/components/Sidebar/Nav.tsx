import React from 'react';
import Link from 'next/link';
import { Text, A } from '../../primitive';
import styled from 'styled-components';

const Nav_ = styled.nav({
  display: 'flex',
  flexWrap: 'wrap',
  height: 50,
});

const Item_ = styled.div({
  width: 110,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
const Nav = () => {
  return (
    <Nav_>
      <Item_>
        <Link href="/">
          <Text as={A}>发现</Text>
        </Link>
      </Item_>
      <Item_>
        <Link href="/search">
          <Text as={A}>搜索</Text>
        </Link>
      </Item_>
    </Nav_>
  );
};

export default Nav;
