import { Collapse, Dropdown, Menu } from 'antd';
import { Arrow, ELF, Logout, LogoutBtn, Photo, USDT } from 'assets/images';
import { useActiveWeb3React } from 'hooks/web3';

import './index.less';

type ChainInfo = { name: string; token: string; balance: string | number; convertedBalance: string | number };

const BalanceCard = (option: {
  icon: string;
  name: string;
  balance: string;
  convertedBalance: string;
  chainList: ChainInfo[];
}) => {
  const { icon, name, balance, convertedBalance, chainList } = option;
  return (
    <Collapse className="token-balance" expandIconPosition="right" expandIcon={() => <Arrow />}>
      <Collapse.Panel
        key={name}
        header={
          <div className="panel-header">
            {icon === 'elf' ? <ELF /> : <USDT />}
            <p className="name">{name}</p>
            <div className="balance">
              <p>{Number(balance).toFixed(3)}</p>
              <p>${Number(convertedBalance).toFixed(3)} USD</p>
            </div>
          </div>
        }>
        {chainList &&
          chainList.map((chain) => {
            const { name, token, balance, convertedBalance } = chain;
            return (
              <div key={name} className="panel-body">
                <div className="body-left">
                  <p>{token}</p>
                  <p>{name}</p>
                </div>
                <div className="body-right">
                  <p>{balance}</p>
                  <p>${convertedBalance} USD</p>
                </div>
              </div>
            );
          })}
      </Collapse.Panel>
    </Collapse>
  );
};
// [{ name: 'Main AELF', token: 'ELF', balance: 2.989, convertedBalance: 2.98 }]
export default function WalletDropdown(options: { avatar?: string; totalBalance: any; chainList: ChainInfo[] }) {
  const { account } = useActiveWeb3React();
  const { avatar, totalBalance, chainList } = options;
  return (
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
                      <Logout className="margin-right-11" /> Log Out
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
          <BalanceCard icon="elf" name={'ELF'} balance={'100'} convertedBalance={'30'} chainList={chainList} />
        </div>
      </Menu.Item>
    </Menu>
  );
}
