import './styles.less';
import CollectionCard, { Collection } from './components/CollectionCard/ CollectionCard';
import TabsHeader from 'components/TabsHeader/TabsHeader';

import { useCollections } from './Hooks/useCollections';
import { useNavigate } from 'react-router-dom';
import { useCallback, useLayoutEffect, useMemo } from 'react';
import { Col, Row } from 'antd';
import clsx from 'clsx';
import { useMobile } from 'contexts/useStore/hooks';

export default function Collections() {
  const isMobile = useMobile();
  const navigate = useNavigate();

  const collectionList = useCollections();

  const children = (collectionList: Collection['option'][]) => {
    const length = collectionList.length;
    return (
      <div className="flex-center">
        <Row gutter={[16, 24]} justify="start" className={clsx('collection-pane', length === 1 && 'flex-center')}>
          {collectionList.map((item) => (
            <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={8} key={item.title} className="grid-collection">
              <CollectionCard key={item.title} option={item}></CollectionCard>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  const paneList = useMemo(
    () =>
      collectionList.map((item) => ({
        ...item,
        children: children(item.collectionList),
      })),
    [collectionList],
  );

  const handleCollectionChange = useCallback(
    (key: string) => {
      navigate(`?pane=${key}`);
    },
    [navigate],
  );

  useLayoutEffect(() => {
    handleCollectionChange(paneList[0]?.key);
  }, [handleCollectionChange, paneList]);

  return (
    <div className={clsx('collection', isMobile && 'mobile-collection')}>
      <h1 className="collection-main-title weight-600">Explore Collection</h1>
      <TabsHeader tabNav={paneList} onChange={handleCollectionChange}></TabsHeader>
    </div>
  );
}
