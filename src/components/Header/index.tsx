import { Layout, Menu, Space } from 'antd';
import clsx from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';
import './index.less';
export default function Header() {
  const { pathname } = useLocation();
  console.log(pathname === '/create', pathname === '/', 'location');
  return (
    <Layout.Header className="flex-between-center aelf-marketplace-header">
      <NavLink to={'/'}>
        <div>{'logo'}</div>
      </NavLink>
      <Space>
        {/* TODO */}
        <NavLink to="/" className={clsx('nav-text', pathname === '/' && 'text-select')}>
          Explore
        </NavLink>
        <NavLink to="/" className={clsx('nav-text', pathname === '/create' && 'text-select')}>
          Create
        </NavLink>

        <NavLink to="/" className={clsx('nav-text', pathname === '/account' && 'text-select')}>
          user
        </NavLink>
        <NavLink to="/">wallet</NavLink>
      </Space>
    </Layout.Header>
  );
}
