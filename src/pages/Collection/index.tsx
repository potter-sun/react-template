import './styles.less';
import CollectionCard, { Collection } from './components/CollectionCard/ CollectionCard';
import TabsHeader, { TabNavType } from 'components/TabsHeader/TabsHeader';

import { useCollections } from './Hooks/useCollections';

export default function Collections() {
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

  const paneList = collectionList.map((item) => ({
    ...item,
    children: children(item.collectionList),
  }));

  return (
    <div className="collection">
      <h1 className="collection-main-title">Explore Collection</h1>
      <TabsHeader tabNav={paneList}></TabsHeader>
    </div>
  );
}
