import { Menu } from 'antd';
import { useLayoutItems } from 'contexts/useItemsLayout';
import { useCallback, useEffect, useState } from 'react';
import MultipleChoice from '../components/MultipleChoice';
import RangeSelect from '../components/RangeSelect';
import SingleChoice from '../components/SingleChoice';
import { FilterType, OnSiderChange } from '../types';
import './ItemsSiderMenu.less';

export default function ItemsSiderMenu({ onSiderChange }: { onSiderChange?: OnSiderChange }) {
  const [filter, setFilter] = useState<{ [x: string]: string[] }>();

  const handleClick = useCallback((v) => {
    console.log(v);
  }, []);

  const [state] = useLayoutItems();
  const SingleChoiceChange = useCallback((e, key) => {
    console.log(e.target.value, key, 'SingleChoiceChange');
    setFilter((v) => {
      return { ...v, [key]: [e.target.value] };
    });
  }, []);

  const MultipleChoiceChange = useCallback((v, key) => {
    console.log(v, key, 'MultipleChoiceChange');
    setFilter((f) => {
      return { ...f, [key]: v };
    });
  }, []);

  useEffect(() => {
    onSiderChange?.(filter);
  }, [filter, onSiderChange]);

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
                    defaultValue={filter?.[item.key]}
                    onChange={SingleChoiceChange}
                  />
                )}
                {item.children.type === FilterType.Multiple && (
                  <MultipleChoice
                    dataSource={item as any}
                    defaultValue={filter?.[item.key]}
                    onChange={MultipleChoiceChange}
                  />
                )}
                {item.children.type === FilterType.Range && (
                  <RangeSelect
                    dataSource={item as any}
                    defaultValue={filter?.[item.key]}
                    onChange={MultipleChoiceChange}
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
