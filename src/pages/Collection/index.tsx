import './styles.less';
import CollectionCard, { Collection } from './components/CollectionCard/ CollectionCard';
import TabsHeader from 'components/TabsHeader/TabsHeader';

import { useCollections } from './Hooks/useCollections';
import { useNavigate } from 'react-router-dom';
import { useCallback, useLayoutEffect, useMemo } from 'react';

export default function Collections() {
  const navigate = useNavigate();

  const collectionList = useCollections();

  const children = (collectionList: Collection['option'][]) => {
    return (
      <div className="collection-pane">
        {collectionList.map((item) => (
          <CollectionCard key={item.title} option={item}></CollectionCard>
        ))}
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
    <div className="collection">
      <h1 className="collection-main-title">Explore Collection</h1>
      <TabsHeader tabNav={paneList} onChange={handleCollectionChange}></TabsHeader>
    </div>
  );
}
