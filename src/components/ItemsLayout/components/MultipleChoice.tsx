import { Checkbox } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { useCallback } from 'react';
import { MultipleItemType } from '../types';
import './index.less';
export interface MultipleChoiceProps {
  dataSource?: MultipleItemType;
  defaultValue?: string[];
  onChange?: (e: Array<CheckboxValueType>, key?: string) => void;
}
export default function MultipleChoice({ dataSource, defaultValue, onChange }: MultipleChoiceProps) {
  const MultipleChoiceHandler = useCallback(
    (v) => {
      onChange?.(v, dataSource?.key);
    },
    [dataSource?.key, onChange],
  );
  return (
    <Checkbox.Group
      className="padding24 multiple-choice-wrapper"
      defaultValue={defaultValue}
      options={dataSource?.children?.data}
      onChange={MultipleChoiceHandler}
    />
  );
}
