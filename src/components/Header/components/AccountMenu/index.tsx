import { Menu } from 'antd';
import { Account, Setting, Logout } from 'assets/images';
import { NavLink } from 'react-router-dom';

export default function AccountMenu() {
  return (
    <div>
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
    </div>
  );
}
