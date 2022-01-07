import InfiniteList from 'components/InfiniteList';
import ItemsCard from 'components/ItemsCard';
import { useLayoutItems } from 'contexts/useItemsLayout';
import useWindowWidth from 'hooks/useWindowWidth';
import { useMemo } from 'react';
import './ScrollContent.less';
const MAP = {
  5: 1920,
  4: 1600,
  3: 1280,
  2: 1024,
};

export default function ScrollContent() {
  const windowWidth = useWindowWidth();
  const [{ isCollapsed, itemsSource }] = useLayoutItems();
  const grid = useMemo(() => {
    let column = '2';
    Object.entries(MAP).forEach(([key, v]) => {
      if (windowWidth > v) return (column = key);
    });
    return Number(column) + (isCollapsed ? 1 : 0);
  }, [isCollapsed, windowWidth]);

  return (
    <div className="scroll-content-wrapper">
      <InfiniteList
        style={{ height: 'calc(100vh - 270px)', overflow: 'scroll' }}
        loaded={false}
        dataLength={itemsSource?.items.length ?? 0}
        loadMoreData={() => {
          // setDataSource((v) => [...v, ...list]);
        }}>
        {(!itemsSource || itemsSource.items.length < 1) && (
          <div className="flex-center scroll-items-empty">No Items to Display.</div>
        )}
        <div className="scroll-content-container" style={{ gridTemplateColumns: `repeat(${grid}, 1fr)` }}>
          {itemsSource?.items?.map((item, index) => (
            <ItemsCard key={index} />
          ))}
        </div>
      </InfiniteList>
    </div>
  );
}
