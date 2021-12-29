import { Menu } from 'assets/images';
import ItemsLayout from 'components/ItemsLayout';
import { useMemo } from 'react';

export default function ExploreItems() {
  const tabName = useMemo(() => [{ title: 'Items', key: 'items', icon: <Menu /> }], []);
  return <ItemsLayout tabNav={tabName} />;
}
