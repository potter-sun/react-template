import { Space } from 'antd';
import BaseSelect from 'components/BaseSelect';
import BaseTag from 'components/BaseTag';
import { SORT_BY, useLayoutItems } from 'contexts/useItemsLayout';
import { basicLayoutView } from 'contexts/useItemsLayout/actions';
import { useLayoutDispatch } from 'contexts/useItemsLayout/hooks';
import { useCallback, useMemo } from 'react';
import { RangeType } from '../types';

export default function TopFilterButton() {
  const [{ filterSelect, selectList }] = useLayoutItems();
  const LayoutDispatch = useLayoutDispatch();

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

  const handleChange = useCallback(
    (v, option) => {
      console.log(v, option);
      LayoutDispatch(
        basicLayoutView.setFilterSelectList.actions(Object.assign(filterSelect ?? {}, { [SORT_BY]: [v] })),
      );
    },
    [LayoutDispatch, filterSelect],
  );
  return (
    <Space className="top-filter-button" size={16}>
      {selectList && (
        <BaseSelect defaultValue={filterSelect?.[SORT_BY]} dataSource={selectList} onChange={handleChange} />
      )}

      {filterSelect &&
        Object.entries(filterSelect).map(([key, value]) => {
          if (key === SORT_BY) return null;
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
