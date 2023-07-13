import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { createPage } from '@/zero';
import './index.less';

import PanelGroup from './components/PanelGroup';

export default createPage({ pageId: '1000' }, () => {
  return (
    <PageContainer pageHeaderRender={false}>
      <PanelGroup />
    </PageContainer>
  );
});
