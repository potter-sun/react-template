import { Select, Space } from 'antd';
import BaseTag from 'components/BaseTag';
import { useLayoutItems } from 'contexts/useItemsLayout';
import { basicLayoutView } from 'contexts/useItemsLayout/actions';
import { useLayoutDispatch } from 'contexts/useItemsLayout/hooks';
import { useCallback, useMemo } from 'react';
import { RangeType } from '../types';

export default function TopFilterButton() {
  const [{ filterSelect }] = useLayoutItems();
  const LayoutDispatch = useLayoutDispatch();
  const PriceData = useMemo(
    () => [
      { key: 'price-ascend', label: 'Price: Low to High' },
      { key: 'price-descend', label: 'Price: High to Low' },
      { key: 'Recently Listed', label: 'Recently Listed' },
    ],
    [],
  );

  const handleChange = useCallback((v, option) => {
    console.log(v, option);
  }, []);

  const tagClose = useCallback(
    (e, key, v) => {
      if (!filterSelect) return;
      const list = filterSelect?.[key];
      if (!list || list?.length === 0) return;
      const index = list.indexOf(v);
      list.splice(index, 1);
      LayoutDispatch(basicLayoutView.setFilterSelectList.actions({ ...filterSelect, [key]: [...list] }));
    },
    [LayoutDispatch, filterSelect],
  );

  const handleClear = useCallback(() => {
    LayoutDispatch(basicLayoutView.setFilterSelectList.actions(null));
  }, [LayoutDispatch]);
  const isEmpty = useMemo(() => {
    if (!filterSelect) return true;
    return Object.values(filterSelect).every((v) => v.length === 0);
  }, [filterSelect]);
  return (
    <Space className="top-filter-button" size={16}>
      <Select defaultValue="price-ascend" style={{ width: 260 }} onChange={handleChange}>
        {PriceData?.map((item) => (
          <Select.Option key={item.key} value={item.key}>
            {item.label}
          </Select.Option>
        ))}
      </Select>

      {filterSelect &&
        Object.entries(filterSelect).map(([key, value]) => {
          return value.map((v: string | RangeType) => (
            <BaseTag
              key={`${key}/${v}`}
              tagClose={(e) => {
                tagClose(e, key, v);
              }}>
              {typeof v === 'string' ? (
                v
              ) : (
                <span className="flex-between-center filter-button-range">{`${v.min} - ${v.max}`}</span>
              )}
            </BaseTag>
          ));
        })}

      {!isEmpty ? (
        <span className="top-filter-clear-all" onClick={handleClear}>
          Clear All
        </span>
      ) : null}
    </Space>
  );
}
