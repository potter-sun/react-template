import { Menu } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import MultipleChoice from '../components/MultipleChoice';
import SingleChoice from '../components/SingleChoice';
import './ItemsSiderMenu.less';

export enum FilterType {
  Single,
  Multiple,
  Range,
}
export default function ItemsSiderMenu() {
  const handleClick = useCallback((v) => {
    console.log(v);
  }, []);
  const filterList = useMemo(
    () => [
      {
        key: 'Status',
        title: 'Status',
        children: {
          type: FilterType.Single,
          data: [
            { key: 'Buy Now', title: 'Buy Now' },
            { key: 'My Items', title: 'My Items' },
          ],
        },
      },
      {
        key: 'Price',
        title: 'Price',
        children: {
          type: FilterType.Range,
          // data: [
          //   { key: 'Buy Now', title: 'Buy Now' },
          //   { key: 'My Items', title: 'My Items' },
          // ],
        },
      },
      {
        key: 'Chains',
        title: 'Chains',
        children: {
          type: FilterType.Multiple,
          data: [
            { value: 'Main AELF', label: 'Main AELF' },
            { value: 'Side tDVV', label: 'Side tDVV' },
          ],
        },
      },
    ],
    [],
  );
  const SingleChoiceChange = useCallback((e) => {
    console.log(e.target.value, 'SingleChoiceChange');
  }, []);

  const MultipleChoiceChange = useCallback((v) => {
    console.log(v, 'MultipleChoiceChange');
  }, []);
  return (
    <>
      <Menu
        onClick={handleClick}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['Chains']}
        className="items-sider-menu"
        mode="inline">
        {filterList.map((item, index) => (
          <Menu.SubMenu key={item.key} title={item.title}>
            {item.children && (
              <>
                {item.children.type === FilterType.Single && (
                  <SingleChoice dataSource={item.children.data} onChange={SingleChoiceChange} />
                )}
                {item.children.type === FilterType.Multiple && (
                  <MultipleChoice dataSource={item.children.data as any[]} onChange={MultipleChoiceChange} />
                )}
              </>
            )}
          </Menu.SubMenu>
        ))}
      </Menu>
    </>
  );
}
