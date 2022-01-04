import { Layout } from 'antd';
import TopFilterButton from '../components/TopFilterButton';
import './ItemsContent.less';

export default function ItemsContent() {
  return (
    <Layout.Content className="items-content">
      <TopFilterButton />
    </Layout.Content>
  );
}
