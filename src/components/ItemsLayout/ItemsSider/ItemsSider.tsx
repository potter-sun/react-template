import { Layout } from 'antd';
import ItemsSiderMenu from '../ItemsSiderMenu/ItemsSiderMenu';
import { CollapsedIcon } from '../../../assets/images';
import { useMemo, useState } from 'react';
import './ItemsSider.less';
import { useLayoutDispatch } from 'contexts/useItemsLayout/hooks';
import { useLayoutItems } from 'contexts/useItemsLayout';
import { basicLayoutView } from 'contexts/useItemsLayout/actions';

export default function ItemsSider() {
  const [{ isCollapsed }] = useLayoutItems();
  const layoutDispatch = useLayoutDispatch();
  const Trigger = useMemo(() => {
    return (
      <div
        className="flex-between-center collapsed-wrapper"
        onClick={() => {
          // setCollapsed((v) => !v);
          layoutDispatch(basicLayoutView.setCollapsed.actions(!isCollapsed));
        }}>
        {!isCollapsed && <span>{'Filter'}</span>}
        <CollapsedIcon />
      </div>
    );
  }, [isCollapsed, layoutDispatch]);
  return (
    <Layout.Sider
      className="items-sider-wrapper"
      width={360}
      collapsed={isCollapsed}
      trigger={Trigger}
      collapsible
      collapsedWidth={64}>
      <ItemsSiderMenu />
    </Layout.Sider>
  );
}
