import InfiniteList from 'components/InfiniteList';
import ItemsCard from 'components/ItemsCard';
import { useLayoutItems } from 'contexts/useItemsLayout';
import useWindowWidth from 'hooks/useWindowWidth';
import { useMemo, useState } from 'react';
import './ScrollContent.less';
const MAP = {
  5: 1920,
  4: 1600,
  3: 1280,
  2: 1024,
}; // [1024, 1280, 1600, 1920];

export default function ScrollContent() {
  const windowWidth = useWindowWidth();
  // const windowFn = useCallback(
  //   () => {

  //   },
  //   [input],
  // )
  // const d = useDebounce()
  // const min1920 = useMedia('(min-width: 1920px)');
  const [{ isCollapsed }] = useLayoutItems();
  const grid = useMemo(() => {
    let column = '2';
    Object.entries(MAP).forEach(([key, v]) => {
      if (windowWidth > v) return (column = key);
    });
    return Number(column) + (isCollapsed ? 1 : 0);
  }, [isCollapsed, windowWidth]);
  const list: any[] = useMemo(
    () =>
      Array(20)
        .fill(1)
        .map((v, i) => {
          return { key: i };
        }),
    [],
  );
  const [list1, setList1] = useState<any[]>(list);

  return (
    <div className="scroll-content-wrapper">
      <InfiniteList
        style={{ height: 'calc(100vh - 281px)', overflow: 'scroll' }}
        loaded={false}
        dataSource={list1}
        loadMoreData={() => {
          setList1((v) => [...v, ...list]);
        }}>
        {(!list || list.length < 1) && <div className="flex-center scroll-items-empty">No Items to Display.</div>}
        <div className="scroll-content-container" style={{ gridTemplateColumns: `repeat(${grid}, 1fr)` }}>
          {list1.map((item, index) => (
            <ItemsCard key={index} />
          ))}
        </div>
      </InfiniteList>
    </div>
  );
}
