import { Space, Tabs } from 'antd';
import React from 'react';
import './TabsHeader.less';
export type TabNavType = {
  title: string;
  key: string;
  icon?: React.ReactNode;
};
export interface TabsHeaderProps {
  tabNav: TabNavType[];
  onChange?: (v: string) => void;
  children?: React.ReactNode;
}
export default function TabsHeader({ tabNav, onChange, children }: TabsHeaderProps) {
  return (
    <Tabs defaultActiveKey={tabNav?.[0]?.key} centered className={'tabs-header'} onChange={onChange}>
      {tabNav.map((item) => (
        <Tabs.TabPane
          tab={
            <Space className="tabs-title" size={15}>
              {item.icon ?? null}
              {item.title}
            </Space>
          }
          key={item.key}>
          {children}
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
}
