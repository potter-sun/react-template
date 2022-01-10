import { Select, SelectProps } from 'antd';
import { KeyLabel } from 'components/ItemsLayout/types';
import './BaseSelect.less';
interface BaseSelectProps {
  dataSource: KeyLabel[];
}
export default function BaseSelect({ dataSource, onChange, defaultValue }: SelectProps & BaseSelectProps) {
  return (
    <Select
      className="base-items-select"
      style={{ width: 260 }}
      value={defaultValue?.[0] ?? dataSource?.[0]?.key}
      onChange={onChange}>
      {dataSource?.map((item) => (
        <Select.Option key={item.key} value={item.key}>
          {item.label}
        </Select.Option>
      ))}
    </Select>
  );
}
