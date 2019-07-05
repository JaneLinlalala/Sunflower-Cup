import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { RouteChildrenProps } from 'react-router';
import router from 'umi/router';

// eslint-disable-next-line sort-imports
import { Button } from 'antd';
import Result from './Result';
import styles from './style.less';

const onClick = (e: { preventDefault: () => void }) => {
  e.preventDefault();
  router.push({
    pathname: '/admin/manage-competition',
  });
};

const RegisterResult: React.SFC<RouteChildrenProps> = ({ location }) => (
  <Result
    className={styles.registerResult}
    type="success"
    title={
      <div className={styles.title}>
        <div>
          <FormattedMessage
            // @ts-ignore
            id="提交成功"
          />
        </div>
        <div style={{ marginTop: '24px' }}>
          <Button onClick={onClick} type="primary">
            返回
          </Button>
        </div>
      </div>
    }
    style={{ marginTop: 56 }}
  />
);

export default RegisterResult;
