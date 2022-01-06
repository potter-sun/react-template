import { Divider, ListProps, Spin } from 'antd';
import { ReactNode, CSSProperties } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export interface InfiniteListProps<T> {
  id?: string;
  dataSource: T[];
  loadMoreData?: (update?: boolean) => void;
  className?: string;
  style?: CSSProperties;
  loaded?: boolean;
  showEndMessage?: boolean;
  children: ReactNode;
}
export default function InfiniteList<T>({
  id = 'scrollableDiv',
  loadMoreData,
  dataSource,
  className,
  style,
  loaded = true,
  showEndMessage = false,
  children,
}: InfiniteListProps<T>) {
  return (
    <div id={id} style={style} className={className}>
      <InfiniteScroll
        scrollableTarget={id}
        dataLength={dataSource.length}
        next={() => {
          console.log('====next');
          if (loaded) return;
          loadMoreData?.();
        }}
        hasMore={!loaded}
        // TODO:loader loading & endMessage
        loader={<Spin />}
        endMessage={showEndMessage && <Divider plain>loaded</Divider>}>
        {children}
      </InfiniteScroll>
    </div>
  );
}
