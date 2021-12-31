import { Radio, RadioChangeEvent } from 'antd';
import { useCallback } from 'react';
import { SingleItemType } from '../types';
import './index.less';

export interface SingleChoiceProps {
  dataSource?: SingleItemType;
  defaultValue?: string[];
  onChange?: (e: RadioChangeEvent, key?: string) => void;
}
export default function SingleChoice({ dataSource, defaultValue, onChange }: SingleChoiceProps) {
  const SingleChoiceHandler = useCallback(
    (e) => {
      onChange?.(e, dataSource?.key);
    },
    [dataSource?.key, onChange],
  );
  return (
    <>
      <Radio.Group
        buttonStyle="solid"
        defaultValue={defaultValue?.[0]}
        className="padding24 single-choice-wrapper"
        onChange={SingleChoiceHandler}>
        {dataSource?.children?.data.map((item) => (
          <Radio.Button key={item?.value} value={item?.value}>
            {item.label}
          </Radio.Button>
        ))}
      </Radio.Group>
    </>
  );
}
