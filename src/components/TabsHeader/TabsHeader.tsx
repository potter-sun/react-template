import { Space, TabPaneProps, Tabs, TabsProps } from 'antd';
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
export default function TabsHeader({ tabNav, onChange, ...props }: TabsHeaderProps & TabsProps) {
  return (
    <Tabs defaultActiveKey={tabNav?.[0]?.key} centered className={'tabs-header'} onChange={onChange} {...props}>
      {tabNav.map((item) => (
        <Tabs.TabPane
          {...item}
          tab={
            <Space className="tabs-title" size={15}>
              {item.icon ?? null}
              {item.title}
            </Space>
          }
          key={item.key}
        />
      ))}
    </Tabs>
  );
}
