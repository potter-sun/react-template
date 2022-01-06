import { Layout } from 'antd';
import TopFilterButton from '../components/TopFilterButton';
import ScrollContent from '../ScrollContent/ScrollContent';

export default function ItemsContent() {
  return (
    <Layout.Content>
      <TopFilterButton />
      <ScrollContent />
    </Layout.Content>
  );
}
