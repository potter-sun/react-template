import { Layout } from 'antd';
import clsx from 'clsx';
import { useCallback } from 'react';
import './ItemsLayout.less';
import TabsHeader, { TabNavType } from '../TabsHeader/TabsHeader';
import ItemsSider from './ItemsSider/ItemsSider';
import ItemsContent from './ItemsContent/ItemsContent';
import useItemsList from 'hooks/useItemsList';
import Updater from './hooks/Updater';
export interface ItemsLayoutProps {
  tabNav: TabNavType[];
}

export default function ItemsLayout({ tabNav }: ItemsLayoutProps) {
  const tabsChange = useCallback((v) => {
    console.log(v, 'tabsChange');
  }, []);

  useItemsList();
  return (
    <>
      <Updater />
      <Layout className={clsx('collection-items-layout')}>
        <Layout.Header>
          <TabsHeader tabNav={tabNav} onChange={tabsChange} />
        </Layout.Header>
        <Layout className={clsx('collection-items-content')}>
          <ItemsSider />
          <ItemsContent />
        </Layout>
      </Layout>
    </>
  );
}
