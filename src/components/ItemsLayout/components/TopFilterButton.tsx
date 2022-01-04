import { Select, Space } from 'antd';
import BaseTag from 'components/BaseTag';
import { useLayoutItems } from 'contexts/useItemsLayout';
import { basicLayoutView } from 'contexts/useItemsLayout/actions';
import { useLayoutDispatch } from 'contexts/useItemsLayout/hooks';
import { useCallback, useMemo } from 'react';

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
      const list = [...filterSelect?.[key]];
      if (!list || list?.length === 0) return;
      const index = list.indexOf(v);
      list.splice(index, 1);
      LayoutDispatch(basicLayoutView.setFilterSelectList.actions({ ...filterSelect, [key]: [...list] }));
      // console.log(key, v, 'tagClose');
    },
    [LayoutDispatch, filterSelect],
  );

  console.log(filterSelect, 'filterSelect');

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
          return value.map((v, index) => (
            <BaseTag
              key={`${key}/${index}`}
              tagClose={(e) => {
                tagClose(e, key, v);
              }}>
              {v}
            </BaseTag>
          ));
        })}
    </Space>
  );
}
