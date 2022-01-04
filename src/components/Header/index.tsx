import { Collapse, Dropdown, Layout, Menu, Space } from 'antd';
import clsx from 'clsx';
import { useActiveWeb3React } from 'hooks/web3';
import { NavLink, useLocation } from 'react-router-dom';

import { Account, Arrow, logo, Logout, LogoutBtn, Photo, Setting, User, Wallet } from '../../assets/images';
import './index.less';
export default function Header() {
  const { account } = useActiveWeb3React();
  const { pathname } = useLocation();

  const totalBalance = 0;

  const avatar = '';
  console.log(pathname === '/create', pathname === '/', 'location');

  const BalanceCard = (option: {
    icon: string;
    name: string;
    balance: string;
    convertedBalance: string;
    chainList: [];
  }) => {
    const { icon, name, balance, convertedBalance, chainList } = option;
    return (
      <Collapse className="token-balance" expandIconPosition="right" expandIcon={() => <Arrow />}>
        <Collapse.Panel
          key={name}
          header={
            <div className="panel-header">
              {icon ? <img className="icon" src={icon} /> : <div className="icon">T</div>}
              <p className="name">{name}</p>
              <div className="balance">
                <p>{balance}</p>
                <p>${convertedBalance} USD</p>
              </div>
            </div>
          }></Collapse.Panel>
        {chainList &&
          chainList.map((chain: { name: string }) => {
            return (
              <div key={chain.name}>
                <p>
                  <span>chainName</span>
                  <span>balance</span>
                </p>
                <p>
                  <span>token</span>
                  <span>${'convertedBalance'} USD</span>
                </p>
              </div>
            );
          })}
      </Collapse>
    );
  };

  const connectedMenu = (
    <Menu>
      <Menu.Item key="account">
        <div className="user-info">
          {avatar ? <img src={avatar} alt="avatar" /> : <Photo />}
          <div>
            <p className="username">
              username{' '}
              <Dropdown
                overlayClassName="overlay-header"
                placement="bottomCenter"
                overlay={
                  <Menu>
                    <Menu.Item key="logOut">
                      <Logout /> Log Out
                    </Menu.Item>
                  </Menu>
                }>
                <LogoutBtn className="logout-btn" />
              </Dropdown>
            </p>
            <p className="address">
              {account?.slice(0, 6)}...{account?.slice(-4)}
            </p>
          </div>
        </div>
      </Menu.Item>
      <Menu.Item key="balance">
        <div className="balance-wrap">
          <div className="total-balance balance">
            <p className="title">Total balance</p>
            <p className="value">${totalBalance.toFixed(2)} USD</p>
          </div>
          <BalanceCard icon={''} name={'ELF'} balance={'100'} convertedBalance={'30'} chainList={[]} />
        </div>
      </Menu.Item>
    </Menu>
  );

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
  ) : (
    connectedMenu
  );

  return (
    <Layout.Header className="flex-between-center aelf-marketplace-header">
      <NavLink to={'/'}>
        <img src={logo} alt="aelf" />
      </NavLink>
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
          <Dropdown
            visible={false}
            overlay={walletMenu}
            overlayClassName="overlay-wallet overlay-header"
            placement="bottomRight">
            <NavLink to="/">
              <Wallet className="header-wallet-btn" />
            </NavLink>
          </Dropdown>
        </Space>
      </Space>
    </Layout.Header>
  );
}
