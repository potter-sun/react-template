import { Space, TabPaneProps, Tabs, TabsProps } from 'antd';
import clsx from 'clsx';
import { useMobile } from 'contexts/useStore/hooks';
import React from 'react';
import './TabsHeader.less';
export interface TabNavType extends TabPaneProps {
  title: string;
  key: string;
  icon?: React.ReactNode;
}
export interface TabsHeaderProps {
  tabNav: TabNavType[];
  onChange?: (v: string) => void;
}
export default function TabsHeader({ tabNav, activeKey, onChange, ...props }: TabsHeaderProps & TabsProps) {
  const isMobile = useMobile();
  return (
    <Tabs
      // defaultActiveKey={tabNav?.[0]?.key}
      activeKey={activeKey || tabNav?.[0]?.key}
      centered
      className={clsx('tabs-header', isMobile && 'mobile-tabs-header')}
      onChange={onChange}
      {...props}>
      {tabNav.map((item) => {
        let icon = item.icon;
        if (typeof item.icon === 'string') {
          icon = <img src={item.icon}></img>;
        }

        return (
          <Tabs.TabPane
            {...item}
            tab={
              <Space className="tabs-title" size={15}>
                {icon ?? null}
                {item.title}
              </Space>
            }
            key={item.key}
          />
        );
      })}
    </Tabs>
  );
}
