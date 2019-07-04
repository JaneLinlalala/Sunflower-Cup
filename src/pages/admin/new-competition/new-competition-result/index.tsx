import {
  FormattedMessage,
  // formatMessage
} from 'umi-plugin-react/locale';
// import { Button } from 'antd';
// import Link from 'umi/link';
import React from 'react';
import { RouteChildrenProps } from 'react-router';

// eslint-disable-next-line sort-imports
import Result from './Result';
import styles from './style.less';

const actions = (
  <div className={styles.actions}>
    {/* <a href=""> */}
    {/*  <Button size="large" type="primary"> */}
    {/*    <FormattedMessage id="user-register-result.register-result.view-mailbox" /> */}
    {/*  </Button> */}
    {/* </a> */}
    {/* <Link to="/"> */}
    {/*  <Button size="large"> */}
    {/*    <FormattedMessage id="user-register-result.register-result.back-home" /> */}
    {/*  </Button> */}
    {/* </Link> */}
  </div>
);

const RegisterResult: React.SFC<RouteChildrenProps> = ({ location }) => (
  <Result
    className={styles.registerResult}
    type="success"
    title={
      <div className={styles.title}>
        {/* <FormattedMessage */}
        {/*  id="user-register-result.register-result.msg" */}
        {/*  values={{ email: location.state ? location.state.account : 'AntDesign@example.com' }} */}
        {/* /> */}
        <FormattedMessage
          // @ts-ignore
          id="提交成功"
        />
      </div>
    }
    // description={formatMessage({ id: 'user-register-result.register-result.activation-email' })}
    actions={actions}
    style={{ marginTop: 56 }}
  />
);

export default RegisterResult;
