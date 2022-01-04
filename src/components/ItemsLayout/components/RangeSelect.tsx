import { Button, Select } from 'antd';
import { valueType } from 'antd/lib/statistic/utils';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';
import './index.less';
import RangeInput from './RangeInput';
import { USDIcon } from '../../../assets/images';
import BigNumber from 'bignumber.js';

type RangeType = {
  min: string | number;
  max: string | number;
};

export interface RangeSelectProps {
  dataSource?: any;
  defaultValue?: string[];
  onChange?: (value: RangeType | undefined, key: string) => void;
}

export default function RangeSelect({ dataSource, defaultValue, onChange }: RangeSelectProps) {
  const [range, setRange] = useState<RangeType>();
  const [applyDis, setApplyDis] = useState<boolean>(true);
  // const handleChange = useCallback((v) => {
  //   console.log(v, 'handleChange');
  // }, []);

  const rangeInputChange = useCallback((min, max) => {
    setApplyDis(true);
    if (!min || !max) {
      return;
    }
    if (new BigNumber(min).gt(max) || new BigNumber(max).lt(min)) {
      return;
    }
    setApplyDis(false);
    setRange({ min, max });

    // range
  }, []);

  // useEffect(() => {
  //   console.log(range, 'range');
  // }, [range]);

  return (
    <div className={clsx('padding24 range-select')}>
      {/* <Select defaultValue="lucy" style={{ width: '100%' }} onChange={handleChange}>
        <Select.Option value="jack">Jack</Select.Option>
        <Select.Option value="lucy">Lucy</Select.Option>
        <Select.Option value="Yiminghe">yiminghe</Select.Option>
        {dataSource?.ch?.map((item) => (
          <Select.Option key={} value="jack">Jack</Select.Option>
        ))}
      </Select> */}
      <Button className="flex-between-center pricing">
        <USDIcon />
        <span>United States Dollar(USD)</span>
      </Button>
      <RangeInput defaultValue={defaultValue} onValueChange={rangeInputChange} />
      <Button
        className="range-select-apply"
        disabled={applyDis}
        type="primary"
        onClick={() => {
          onChange?.(range, dataSource.key);
        }}>
        Apply
      </Button>
    </div>
  );
}
