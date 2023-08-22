import React from 'react';
import { createPage, ICProps } from '@/zero';

import Content from './components/Content';

export default createPage(
  { pageId: '1000', isNeedLogin: false },
  (props: ICProps) => {
    return <Content {...props} />;
  }
);
