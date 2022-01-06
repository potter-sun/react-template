import { Menu } from 'assets/images';
import ItemsLayout from 'components/ItemsLayout';
import { FilterItemList, FilterType } from 'components/ItemsLayout/types';
import { basicLayoutView } from 'contexts/useItemsLayout/actions';
import { useLayoutDispatch } from 'contexts/useItemsLayout/hooks';
import { useEffect, useMemo } from 'react';

export default function ExploreItems() {
  const tabName = useMemo(() => [{ title: 'Items', key: 'items', icon: <Menu /> }], []);
  const LayoutDispatch = useLayoutDispatch();

  const filterList: FilterItemList = useMemo(
    () => [
      {
        key: 'Status',
        title: 'Status',
        children: {
          type: FilterType.Single,
          data: [
            { value: 'Buy Now', label: 'Buy Now' },
            { value: 'My Items', label: 'My Items', ccc: 1 },
          ],
        },
      },
      {
        key: 'Price',
        title: 'Price',
        children: {
          type: FilterType.Range,
          // selectOption: [
          //   { key: 'USD', title: 'United States Dollar(USD)' },
          //   { key: 'ELF', title: 'ELF' },
          // ],
        },
      },
      {
        key: 'Chains',
        title: 'Chains',
        children: {
          type: FilterType.Multiple,
          data: [
            { value: 'Main AELF', label: 'Main AELF' },
            { value: 'Side tDVV', label: 'Side tDVV' },
          ],
        },
      },
      {
        key: 'On Sales In',
        title: 'On Sales In',
        children: {
          type: FilterType.Multiple,
          data: [
            { value: 'ELF', label: 'ELF' },
            { value: 'USDT', label: 'USDT' },
          ],
        },
      },
    ],
    [],
  );
  useEffect(() => {
    LayoutDispatch(basicLayoutView.setFilterList.actions(filterList));
    return () => {
      LayoutDispatch(basicLayoutView.setDestroy.actions());
    };
  }, [LayoutDispatch, filterList]);
  return <ItemsLayout tabNav={tabName} />;
}
