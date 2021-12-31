import { Layout } from 'antd';
import clsx from 'clsx';
import { useCallback } from 'react';
import './ItemsLayout.less';
import TabsHeader, { TabNavType } from '../TabsHeader/TabsHeader';
import ItemsSider from './ItemsSider/ItemsSider';
import { OnSiderChange } from './types';
import ItemsContent from './ItemsContent/ItemsContent';
export interface ItemsLayoutProps {
  tabNav: TabNavType[];
  onSiderChange?: OnSiderChange;
}

export default function ItemsLayout({ tabNav, onSiderChange }: ItemsLayoutProps) {
  const tabsChange = useCallback((v) => {
    console.log(v, 'tabsChange');
  }, []);
  return (
    <Layout className={clsx('collection-items-layout')}>
      <Layout.Header>
        <TabsHeader tabNav={tabNav} onChange={tabsChange} />
      </Layout.Header>
      <Layout className={clsx('collection-items-content')}>
        <ItemsSider onSiderChange={onSiderChange} />
        <ItemsContent />
      </Layout>
    </Layout>
  );
}
