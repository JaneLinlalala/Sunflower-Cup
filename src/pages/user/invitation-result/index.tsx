import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { RouteChildrenProps } from 'react-router';

// eslint-disable-next-line sort-imports
import Result from './Result';
import styles from './style.less';

const RegisterResult: React.SFC<RouteChildrenProps> = ({ location }) => (
  <Result
    className={styles.registerResult}
    type="success"
    title={
      <div className={styles.title}>
        <div>
          <FormattedMessage
            // @ts-ignore
            id="已拒绝邀请"
          />
        </div>
      </div>
    }
    style={{ marginTop: 56 }}
  />
);

export default RegisterResult;
