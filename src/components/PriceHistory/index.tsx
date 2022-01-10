import { Select } from 'antd';
import { useState } from 'react';
import './style.less';
const { Option } = Select;
export default function PriceHistory() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="price-history bg-dark radius-12 width-100 height-100">
      <p className="text-light font-18 weight-500 mg-bt-16">Price History</p>
      <Select className="bg-nav" defaultValue="7" dropdownClassName="time-select-dropdown" loading={isLoading}>
        <Option value="7">Last 7 Days</Option>
        <Option value="30">Last 30 Days</Option>
        <Option value="all">ALL Time</Option>
      </Select>
    </div>
  );
}
