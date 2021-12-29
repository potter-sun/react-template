import { Radio, RadioChangeEvent } from 'antd';
import './index.less';
export interface SingleChoiceProps {
  dataSource?: any[];
  onChange?: (e: RadioChangeEvent) => void;
}
export default function SingleChoice({ dataSource, onChange }: SingleChoiceProps) {
  return (
    <>
      <Radio.Group buttonStyle="solid" className="padding24 single-choice-wrapper" onChange={onChange}>
        {dataSource?.map((item) => (
          <Radio.Button key={item?.key} value={item?.key}>
            {item.title}
          </Radio.Button>
        ))}
      </Radio.Group>
    </>
  );
}
