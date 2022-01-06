import { Menu, Button } from 'antd';
import { AELF } from 'assets/images';
import { basicModalView } from 'contexts/useModal/actions';
import { useModalDispatch } from 'contexts/useModal/hooks';
import { useActiveWeb3React } from 'hooks/web3';
import React from 'react';
import WalletDropdown from '../WalletDropdown';

export default function WalletMenu() {
  const { account } = useActiveWeb3React();
  const modalDispatch = useModalDispatch();

  return !account ? (
    <div>
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
    </div>
  ) : (
    <WalletDropdown
      totalBalance={300}
      chainList={[
        { name: 'Main AELF', token: 'ELF', balance: 2.989, convertedBalance: 2.98 },
        { name: 'Side tDVV', token: 'ELF', balance: 2.989, convertedBalance: 2.989 },
      ]}
    />
  );
}
