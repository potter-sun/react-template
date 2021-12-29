import { Layout } from 'antd';
import ItemsSiderMenu from '../ItemsSiderMenu/ItemsSiderMenu';
import { CollapsedIcon } from '../../../assets/images';
import { useMemo, useState } from 'react';
import './ItemsSider.less';
export default function ItemsSider() {
  const [isCollapsed, setCollapsed] = useState<boolean>(false);

  const Trigger = useMemo(() => {
    return (
      <div
        className="flex-between-center collapsed-wrapper"
        onClick={() => {
          setCollapsed((v) => !v);
        }}>
        {!isCollapsed && <span>{'Filter'}</span>}
        <CollapsedIcon />
      </div>
    );
  }, [isCollapsed]);
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
