import { Layout } from 'antd';
import clsx from 'clsx';
import { useCallback, useState } from 'react';
import './ItemsLayout.less';
import TabsHeader, { TabNavType } from '../TabsHeader/TabsHeader';
import ItemsSider from './ItemsSider/ItemsSider';
export interface ItemsLayoutProps {
  tabNav: TabNavType[];
}

export default function ItemsLayout({ tabNav }: ItemsLayoutProps) {
  const tabsChange = useCallback((v) => {
    console.log(v, 'tabsChange');
  }, []);
  return (
    <Layout className={clsx('collection-items-layout')}>
      <Layout.Header>
        <TabsHeader tabNav={tabNav} onChange={tabsChange} />
      </Layout.Header>
      <Layout className={clsx('collection-items-content')}>
        <ItemsSider />
        <Layout.Content>Content</Layout.Content>
      </Layout>
    </Layout>
  );
}
