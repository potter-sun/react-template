import { Layout } from 'antd';
import { useLayoutItems } from 'contexts/useItemsLayout';
import './ItemsContent.less';

export default function ItemsContent() {
  const [{ filterList }] = useLayoutItems();

  return (
    <Layout.Content className="items-content">
      <div>{filterList?.map((item) => item.key)}</div>
    </Layout.Content>
  );
}
