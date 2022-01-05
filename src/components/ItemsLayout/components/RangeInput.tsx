import { Input } from 'antd';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useState } from 'react';
import { RangeType } from '../types';

export interface RangeInputProps {
  defaultValue?: RangeType[];
  onValueChange?: (min?: number | string, max?: number | string) => void;
}

export default function RangeInput({ defaultValue, onValueChange }: RangeInputProps) {
  const [min, setMin] = useState<number | string>(defaultValue?.[0]?.min ?? '');
  const [max, setMax] = useState<number | string>(defaultValue?.[0]?.max ?? '');

  useEffect(() => {
    setMin(defaultValue?.[0]?.min ?? '');
    setMax(defaultValue?.[0]?.max ?? '');
  }, [defaultValue]);

  const formatNumber = useCallback((v) => {
    if (new BigNumber(v.target.value).isNaN() || new BigNumber(v.target.value).lt(0)) {
      return '';
    }
    return v.target.value;
  }, []);
  const minHandler = useCallback(
    (v) => {
      const val = formatNumber(v);
      if (!val) return setMin('');
      // if (!max) return setMin(val);
      // if (val <= max) return setMin(val);
      setMin(val);
    },
    [formatNumber],
  );

  const maxHandler = useCallback(
    (v) => {
      const val = formatNumber(v);
      if (!val) return setMax('');
      // if (!min) return setMax(val);
      // if (val >= min) return setMax(val);
      setMax(val);
    },
    [formatNumber],
  );
  useEffect(() => {
    onValueChange?.(min, max);
  }, [min, max, onValueChange]);
  return (
    <div className="flex-between-center range-wrapper">
      <Input placeholder="Min" defaultValue={defaultValue?.[0]?.min} type="number" value={min} onChange={minHandler} />
      <span className="text">TO</span>
      <Input placeholder="Max" defaultValue={defaultValue?.[0]?.max} type="number" value={max} onChange={maxHandler} />
    </div>
  );
}
