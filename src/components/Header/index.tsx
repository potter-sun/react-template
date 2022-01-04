import { Button, Drawer, Dropdown, Layout, Menu, Slider, Space } from 'antd';
import clsx from 'clsx';
import { basicModalView } from 'contexts/useModal/actions';
import { useModalDispatch } from 'contexts/useModal/hooks';
import { useActiveWeb3React } from 'hooks/web3';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { NavLink, useLocation } from 'react-router-dom';

import { Account, AELF, Explore, Frame, Logo, Logout, MobileLogo, Setting, User, Wallet } from '../../assets/images';
import WalletDropdown from './components/WalletDropdown';
import './index.less';
export default function Header() {
  const modalDispatch = useModalDispatch();
  const { account } = useActiveWeb3React();
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const accountMenu = (
    <Menu>
      <Menu.Item key="account">
        <NavLink to="/account">
          <Account /> Profile
        </NavLink>
      </Menu.Item>
      <Menu.Item key="settings">
        <NavLink to="/settings">
          <Setting /> Settings
        </NavLink>
      </Menu.Item>
      <Menu.Item key="logOut">
        <Logout /> Log Out
      </Menu.Item>
    </Menu>
  );
  const walletMenu = !account ? (
    <Menu className="unconnected-menu">
      <Menu.Item key="account">
        <div className="account-tip">
          <p className="text-light font-20 weight-500">Collect your wallet</p>
          <p className="text-gray font-14">Please connect AELF wallet</p>
        </div>
      </Menu.Item>
      <Menu.Item key="settings">
        <div className="width-100">
          <div className="outline radius-11 width-100 margin-column-16 flex-center padding-16">
            <AELF />
          </div>
          <Button
            onClick={() => {
              modalDispatch(basicModalView.setWalletModal.actions(true));
            }}
            type="primary"
            className="width-100 flex-center font-16 connect-btn">
            Connect
          </Button>
        </div>
      </Menu.Item>
    </Menu>
  ) : (
    <WalletDropdown
      totalBalance={300}
      chainList={[{ name: 'Main AELF', token: 'ELF', balance: 2.989, convertedBalance: 2.98 }]}
    />
  );

  return (
    <Layout.Header className={clsx('flex-between-center aelf-marketplace-header', isMobile && 'mobile-header')}>
      <NavLink to={'/'}>
        {/* <img src={isMobile ? mobileLogo : logo} alt="aelf" /> */}
        {isMobile ? <MobileLogo /> : <Logo />}
      </NavLink>
      {isMobile ? (
        <>
          <Frame onClick={showDrawer} />
          <Drawer
            className="header-drawer"
            extra={<MobileLogo />}
            placement={'right'}
            onClose={onClose}
            visible={visible}>
            <p>
              <NavLink to={'/'}>
                <Explore /> <span>Explore</span>
              </NavLink>
            </p>
            <p>
              <NavLink to={'/'}>
                <Explore /> <span>Create</span>
              </NavLink>
            </p>
            <p>
              <NavLink to={'/'}>
                <Explore /> <span>Explore</span>
              </NavLink>
            </p>
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
            <Dropdown overlay={accountMenu} overlayClassName="overlay-account overlay-header" placement="bottomRight">
              <NavLink to="/" className={clsx('nav-text', pathname === '/account' && 'text-select')}>
                <User className="header-account-btn" />
              </NavLink>
            </Dropdown>
            <Dropdown overlay={walletMenu} overlayClassName="overlay-wallet overlay-header" placement="bottomRight">
              <Wallet className="header-wallet-btn" />
            </Dropdown>
          </Space>
        </Space>
      )}
    </Layout.Header>
  );
}
