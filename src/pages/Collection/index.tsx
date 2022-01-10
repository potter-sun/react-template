import './styles.less';
import CollectionCard, { Collection } from './components/CollectionCard/ CollectionCard';
import TabsHeader, { TabNavType } from 'components/TabsHeader/TabsHeader';

import { Item, useCollections } from './Hooks/useCollections';
import { useCallback, useMemo, useState } from 'react';
import { Col, Row } from 'antd';
import clsx from 'clsx';
import { useMobile } from 'contexts/useStore/hooks';
import { useHash } from 'react-use';
import { useNftTypes } from './Hooks/useNftTypes';

export default function Collections() {
  const isMobile = useMobile();
  const [panelType, setPanelType] = useHash();

  const [collectionList, setCollectionList] = useState<Item[]>([]);

  const types = useNftTypes();

  const type = useMemo(() => panelType.slice(1), [panelType]);

  // setPanelType(type);

  const Children = () => {
    const collectionList = useCollections(type);
    const length = collectionList.length;

    return (
      <div className="flex-center">
        <Row gutter={[16, 24]} justify="start" className={clsx('collection-panel', length === 1 && 'flex-center')}>
          {collectionList.map((item) => {
            return (
              <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8} key={item.protocolName} className="grid-collection">
                <CollectionCard key={item.protocolName} option={item}></CollectionCard>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  };

  const paneList: TabNavType[] = useMemo(
    () =>
      types.map((item: string) => ({
        key: item,
        title: item,
      })),
    [types],
  );

  const handleCollectionChange = useCallback(
    (key: string) => {
      console.log(key);

      // navigate(`?panel=${key}`);
      setPanelType(key);
    },
    [setPanelType],
  );

  return (
    <div className={clsx('collection', isMobile && 'mobile-collection')}>
      <h1 className="collection-main-title weight-600">Explore Collection</h1>
      <TabsHeader
        tabNav={paneList}
        activeKey={type.replaceAll('%20', ' ') || ''}
        onChange={handleCollectionChange}></TabsHeader>
      <Children />
    </div>
  );
}
