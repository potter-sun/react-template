import { Checkbox } from 'antd';
import { CheckboxOptionType, CheckboxValueType } from 'antd/lib/checkbox/Group';
import './index.less';
export interface MultipleChoiceProps {
  dataSource?: CheckboxOptionType[];
  onChange?: (e: Array<CheckboxValueType>) => void;
}
export default function MultipleChoice({ dataSource, onChange }: MultipleChoiceProps) {
  return <Checkbox.Group className="padding24 multiple-choice-wrapper" options={dataSource} onChange={onChange} />;
}
