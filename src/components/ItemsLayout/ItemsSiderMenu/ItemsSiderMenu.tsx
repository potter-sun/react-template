import { Menu } from 'antd';
import { useLayoutItems } from 'contexts/useItemsLayout';
import { basicLayoutView } from 'contexts/useItemsLayout/actions';
import { useLayoutDispatch } from 'contexts/useItemsLayout/hooks';
import { useCallback, useEffect, useState } from 'react';
import MultipleChoice from '../components/MultipleChoice';
import RangeSelect from '../components/RangeSelect';
import SingleChoice from '../components/SingleChoice';
import { FilterType } from '../types';
import './ItemsSiderMenu.less';

export default function ItemsSiderMenu() {
  const [filter, setFilter] = useState<{ [x: string]: string[] }>();
  const [{ filterSelect }] = useLayoutItems();
  const handleClick = useCallback((v) => {
    console.log(v);
  }, []);

  const [state] = useLayoutItems();
  const layoutDispatch = useLayoutDispatch();
  const SingleChoiceChange = useCallback((e, key) => {
    console.log(e.target.value, key, 'SingleChoiceChange');
    setFilter((v) => {
      return { ...v, [key]: [e.target.value] };
    });
  }, []);

  const MultipleChoiceChange = useCallback((v, key) => {
    setFilter((f) => {
      return { ...f, [key]: v };
    });
  }, []);

  const RangeSelectChange = useCallback((v, key) => {
    setFilter((f) => {
      return { ...f, [key]: [v.min, v.max] };
    });
  }, []);

  useEffect(() => {
    if (!filter) return;
    layoutDispatch(basicLayoutView.setFilterSelectList.actions(filter));
  }, [filter, layoutDispatch]);

  return (
    <>
      <Menu
        onClick={handleClick}
        // defaultSelectedKeys={['1']}
        // defaultOpenKeys={[]}
        className="items-sider-menu"
        mode="inline">
        {state?.filterList?.map((item) => (
          <Menu.SubMenu key={item.key} title={item.title}>
            {item.children && (
              <>
                {item.children.type === FilterType.Single && (
                  <SingleChoice
                    dataSource={item as any}
                    defaultValue={filterSelect?.[item.key]}
                    onChange={SingleChoiceChange}
                  />
                )}
                {item.children.type === FilterType.Multiple && (
                  <MultipleChoice
                    dataSource={item as any}
                    defaultValue={filterSelect?.[item.key]}
                    onChange={MultipleChoiceChange}
                  />
                )}
                {item.children.type === FilterType.Range && (
                  <RangeSelect
                    dataSource={item as any}
                    defaultValue={filterSelect?.[item.key]}
                    onChange={RangeSelectChange}
                  />
                )}
              </>
            )}
          </Menu.SubMenu>
        ))}
      </Menu>
    </>
  );
}
