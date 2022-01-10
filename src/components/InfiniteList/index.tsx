import { Divider, ListProps, Spin } from 'antd';
import { ReactNode, CSSProperties } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../LoadingMore';
export interface InfiniteListProps<T> {
  id?: string;
  dataLength: number;
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
  dataLength,
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
        dataLength={dataLength}
        next={() => {
          if (loaded) return;
          loadMoreData?.();
        }}
        hasMore={!loaded}
        // TODO:loader loading & endMessage
        loader={<Loading />}
        endMessage={showEndMessage && <Divider plain>loaded</Divider>}>
        {children}
      </InfiniteScroll>
    </div>
  );
}
