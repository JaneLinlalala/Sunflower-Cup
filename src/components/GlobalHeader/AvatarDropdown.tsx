import { Avatar, Icon, Menu, Spin } from 'antd';
import { ConnectProps, ConnectState } from '@/models/connect';

import { ClickParam } from 'antd/es/menu';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import currentUserName from '@/utils/currentUserName';

export interface GlobalHeaderRightProps extends ConnectProps {
  currentUserName?: string;
  menu?: boolean;
}

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {
  onMenuClick = (event: ClickParam) => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;
      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }
    router.push(`/account/${key}`);
  };

  render(): React.ReactNode {
    const { currentUserName, menu } = this.props;
    if (!menu) {
      return (
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} icon="user" alt="avatar" />
          <span className={styles.name}>{currentUserName}</span>
        </span>
      );
    }
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );

    return currentUserName ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} icon="user" alt="avatar" />
          <span className={styles.name}>{currentUserName}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
    );
  }
}
export default connect(({ user }: ConnectState) => ({
  currentUserName: currentUserName.get(),
}))(AvatarDropdown);
