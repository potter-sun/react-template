import { Menu } from 'assets/images';
import ItemsLayout from 'components/ItemsLayout';
import { basicLayoutView } from 'contexts/useItemsLayout/actions';
import { useLayoutDispatch } from 'contexts/useItemsLayout/hooks';
import { useEffect, useMemo } from 'react';
import { filterList, selectList } from './states';

export default function ExploreItems() {
  const tabName = useMemo(() => [{ title: 'Items', key: 'items', icon: <Menu /> }], []);
  const LayoutDispatch = useLayoutDispatch();

  useEffect(() => {
    LayoutDispatch(basicLayoutView.setFilterList.actions(filterList));
    LayoutDispatch(basicLayoutView.setSelectList.actions(selectList));

    return () => {
      LayoutDispatch(basicLayoutView.setDestroy.actions());
    };
  }, [LayoutDispatch]);

  return <ItemsLayout tabNav={tabName} />;
}
