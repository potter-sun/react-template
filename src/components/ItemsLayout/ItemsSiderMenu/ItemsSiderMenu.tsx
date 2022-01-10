import { Menu } from 'antd';
import { useLayoutItems } from 'contexts/useItemsLayout';
import { basicLayoutView } from 'contexts/useItemsLayout/actions';
import { useLayoutDispatch } from 'contexts/useItemsLayout/hooks';
import { useCallback } from 'react';
import MultipleChoice from '../components/MultipleChoice';
import RangeSelect from '../components/RangeSelect';
import SingleChoice from '../components/SingleChoice';
import { FilterType, RangeType } from '../types';
import './ItemsSiderMenu.less';

export default function ItemsSiderMenu() {
  const [{ filterSelect }] = useLayoutItems();
  const handleClick = useCallback((v) => {
    console.log(v);
  }, []);

  const [state] = useLayoutItems();
  const layoutDispatch = useLayoutDispatch();
  const dispatchCallback = useCallback(
    (filter) => {
      layoutDispatch(basicLayoutView.setFilterSelectList.actions(filter));
    },
    [layoutDispatch],
  );
  const SingleChoiceChange = useCallback(
    (e, key) => {
      dispatchCallback({ ...filterSelect, [key]: [e.target.value] });
    },
    [dispatchCallback, filterSelect],
  );

  const MultipleChoiceChange = useCallback(
    (v, key) => {
      dispatchCallback({ ...filterSelect, [key]: v });
    },
    [dispatchCallback, filterSelect],
  );

  const RangeSelectChange = useCallback(
    (v, key) => {
      dispatchCallback({ ...filterSelect, [key]: [v] });
    },
    [dispatchCallback, filterSelect],
  );

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
                    defaultValue={filterSelect?.[item.key] as string[]}
                    onChange={SingleChoiceChange}
                  />
                )}
                {item.children.type === FilterType.Multiple && (
                  <MultipleChoice
                    dataSource={item as any}
                    defaultValue={filterSelect?.[item.key] as string[]}
                    onChange={MultipleChoiceChange}
                  />
                )}
                {item.children.type === FilterType.Range && (
                  <RangeSelect
                    dataSource={item as any}
                    defaultValue={filterSelect?.[item.key] as RangeType[]}
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
