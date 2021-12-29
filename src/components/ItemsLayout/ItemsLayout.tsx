import { Layout } from 'antd';
import clsx from 'clsx';
import { useCallback } from 'react';
import './ItemsLayout.less';
import TabsHeader, { TabNavType } from '../TabsHeader/TabsHeader';

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
      <Layout>
        <Layout.Sider>Sider</Layout.Sider>
        <Layout.Content>Content</Layout.Content>
      </Layout>
    </Layout>
  );
}
