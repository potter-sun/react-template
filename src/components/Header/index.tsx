import { Button, Drawer, Dropdown, Layout, Menu, Space } from 'antd';
import clsx from 'clsx';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { NavLink, useLocation } from 'react-router-dom';
import AccountMenu from './components/AccountMenu';
import WalletMenu from './components/WalletMenu';

import {
  Create,
  Explore,
  Frame,
  PCLogo,
  Logout,
  MobileLogo,
  Profile,
  Setting,
  User,
  Wallet,
} from '../../assets/images';
import './index.less';
export default function Header() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const [childVisible, setChildVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const showChildDrawer = () => {
    setChildVisible(true);
  };
  const onClose = () => {
    setTimeout(() => {
      setVisible(false);
      setChildVisible(false);
    }, 10);
  };
  const onChildClose = () => {
    setTimeout(() => {
      setChildVisible(false);
    }, 10);
  };

  return (
    <Layout.Header className={clsx('flex-between-center aelf-marketplace-header', isMobile && 'mobile-header')}>
      <NavLink to={'/'}>
        <img className={clsx('header-logo', isMobile && 'mobile-logo')} src={isMobile ? MobileLogo : PCLogo} />
      </NavLink>
      {isMobile ? (
        <>
          <Frame onClick={showDrawer} />
          <Drawer
            className="header-drawer"
            extra={<img src={MobileLogo} />}
            placement="right"
            onClose={onClose}
            visible={visible}>
            <div>
              <div className="menu-wrap" onClick={onClose}>
                <p className="menu-item">
                  <NavLink to={'/'}>
                    <Explore /> <span>Explore</span>
                  </NavLink>
                </p>
                <p className="menu-item">
                  <NavLink to={'/'}>
                    <Create /> <span>Create</span>
                  </NavLink>
                </p>
              </div>
              <div className="menu-wrap">
                <p className="menu-item" onClick={onClose}>
                  <NavLink to={'/'}>
                    <Profile /> <span>Profile</span>
                  </NavLink>
                </p>
                <p className="menu-item" onClick={showChildDrawer}>
                  <Wallet /> <span>Wallet</span>
                  <Drawer
                    className="header-drawer child-drawer"
                    extra={<img src={MobileLogo} />}
                    placement="right"
                    onClose={onClose}
                    visible={childVisible}>
                    <h1 className="drawer-title weight-600">Wallet</h1>
                    <WalletMenu />
                    <div className="return-wrap">
                      <Button type="default" onClick={onChildClose}>
                        Return
                      </Button>
                    </div>
                  </Drawer>
                </p>
              </div>
            </div>
            <div className="menu-bottom">
              <p className="menu-item" onClick={onClose}>
                <NavLink to={'/settings'}>
                  <Setting /> <span>Settings</span>
                </NavLink>
              </p>
              <p className="menu-item">
                <Logout /> <span>Log Out</span>
              </p>
            </div>
          </Drawer>
        </>
      ) : (
        <Space className="btn-wrap">
          <Space className="text-btn-wrap">
            <NavLink to="/" className={clsx('nav-text', pathname === '/' && 'text-select')}>
              Explore
            </NavLink>
            <NavLink to="/" className={clsx('nav-text', pathname === '/create' && 'text-select')}>
              Create
            </NavLink>
          </Space>

          <Space className="icon-btn-wrap">
            <Dropdown
              overlay={<AccountMenu />}
              overlayClassName="overlay-account overlay-header"
              placement="bottomRight">
              <NavLink to="/" className={clsx('nav-text', pathname === '/account' && 'text-select')}>
                <User className="header-account-btn" />
              </NavLink>
            </Dropdown>
            <Dropdown overlay={<WalletMenu />} overlayClassName="overlay-wallet overlay-header" placement="bottomRight">
              <Wallet className="header-wallet-btn" />
            </Dropdown>
          </Space>
        </Space>
      )}
    </Layout.Header>
  );
}
