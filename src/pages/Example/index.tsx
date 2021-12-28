import { Button, Dropdown, Input, Menu } from 'antd';
import { useAElf } from 'contexts/useAElf';
import { useAElfContract } from 'contexts/useAElfContract/hooks';
import { basicModalView } from 'contexts/useModal/actions';
import { useModalDispatch } from 'contexts/useModal/hooks';
import { useActiveWeb3React } from 'hooks/web3';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import './styles.less';
const html = window.document.getElementsByTagName('html')[0];
export default function Example() {
  const { account } = useActiveWeb3React();
  const modalDispatch = useModalDispatch();
  const [{ address, chainId }, { Connect, DisConnect }] = useAElf();
  const aelfTokenContract = useAElfContract('tokenContract');
  const balance = async () => {
    if (!aelfTokenContract) return;
    const req = await aelfTokenContract?.callViewMethod('GetBalance', {
      symbol: 'ELF',
      owner: address,
    });
    console.log(req, '=====req');
  };
  useEffect(() => {
    balance();
  });

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        3rd menu item
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <Button
        type="primary"
        disabled
        onClick={() => {
          !account
            ? modalDispatch(basicModalView.setWalletModal.actions(true))
            : modalDispatch(basicModalView.setAccountModal.actions(true));
        }}>
        {account ? account : 'Connect'}
      </Button>
      <Button
        type="default"
        onClick={() => {
          if (!html.getAttribute('data-theme') || html.getAttribute('data-theme') === 'light') {
            html.setAttribute('data-theme', 'dark');
          } else {
            html.setAttribute('data-theme', 'light');
          }
        }}>
        color
      </Button>
      <Button
        type="primary"
        onClick={() => {
          !address ? Connect() : DisConnect();
        }}>
        {address ? address : 'Connect aelf'}
      </Button>

      <Input placeholder="wodeee" />
      <Input value="wodeee" disabled />
      <Dropdown overlay={menu}>
        <Button>
          Button <DownOutlined />
        </Button>
      </Dropdown>
      {chainId}
      <div className="test-class" />
      <h1 className="test-class">ASDASDADSD</h1>
    </div>
  );
}
