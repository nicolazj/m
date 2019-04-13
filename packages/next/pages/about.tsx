import Link from 'next/link';
import React from 'react';

import { Text } from '../shared/primitive';

export default () => (
  <div>
    <div>
      <Text>about </Text>
      <h2>新歌</h2>

      <Link href="/">
        <a>to index Page</a>
      </Link>
    </div>
  </div>
);
