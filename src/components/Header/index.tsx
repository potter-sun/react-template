import { Layout, Menu, Space } from 'antd';
import { NavLink } from 'react-router-dom';
import './index.less';
export default function Header() {
  return (
    <Layout.Header className="flex-between-center aelf-marketplace-header">
      <NavLink to={'/'}>
        <div>{'logo'}</div>
      </NavLink>
      <Space>
        {/* TODO */}
        <NavLink to="/">Explore</NavLink>
        <NavLink to="/">Create</NavLink>

        <NavLink to="/">user</NavLink>
        <NavLink to="/">wallet</NavLink>
      </Space>
    </Layout.Header>
  );
}
