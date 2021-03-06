import { Button, Form, Input, Popover, Progress, message } from 'antd'; //删除ca及row、select
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import Link from 'umi/link';
import { connect } from 'dva';
import router from 'umi/router';

import { StateType } from './model';
import styles from './style.less';

const FormItem = Form.Item;
//const { Option } = Select;
//const InputGroup = Input.Group;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="user-register.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="user-register.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="user-register.strength.short" />
    </div>
  ),
};

const passwordProgressMap: {
  ok: 'success';
  pass: 'normal';
  poor: 'exception';
} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

interface userRegisterProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  userRegister: StateType;
  submitting: boolean;
}
interface userRegisterState {
  count: number;
  confirmDirty: boolean;
  visible: boolean;
  help: string;
  prefix: string;
}

export interface userRegisterParams {
  email: string;
  passwords: string;
  confirm: string;
  captcha: string;
  prefix: string;
}

@connect(
  ({
    userRegister,
    loading,
  }: {
    userRegister: StateType;
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => ({
    userRegister,
    submitting: loading.effects['userRegister/submit'],
  }),
)
class Register extends Component<userRegisterProps, userRegisterState> {
  state: userRegisterState = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: '',
    prefix: '86',
  };

  interval: number | undefined = undefined;

  componentDidMount(): void {
    const {dispatch} = this.props;
    const query = this.props.location.search ;// '?expertId=4&projectId=12'
    const arr = query.split('&'); // ['?expertId=4', 'projectId=12']
    const eid = arr[0].substr(10); // '4'
    const pid = arr[1].substr(10); // '7'
    console.log(eid);
    console.log(pid);
    dispatch({
      type: 'userRegister/pass',
      payload: {
        projectId:pid,
        expertId:eid,
      },
    });
  }

  componentDidUpdate() {
    const { userRegister, form } = this.props;
    const account = form.getFieldValue('email');
    if (userRegister.status === 'ok') {
      message.success('注册成功！');
      router.push({
        pathname: '/user/register-result',
        state: {
          account,
        },
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    let count = 59;
    this.setState({ count });
    this.interval = window.setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('passwords');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { prefix } = this.state;
        dispatch({
          type: 'userRegister/submit',
          payload: {
            ...values,
            prefix,
          },
        });
      }
    });
  };

  checkConfirm = (rule: any, value: string, callback: (messgae?: string) => void) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('passwords')) {
      callback(formatMessage({ id: 'user-register.password.twice' }));
    } else {
      callback();
    }
  };

  checkPassword = (rule: any, value: string, callback: (messgae?: string) => void) => {
    const { visible, confirmDirty } = this.state;
    if (!value) {
      this.setState({
        help: formatMessage({ id: 'user-register.password.required' }),
        visible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });
      if (!visible) {
        this.setState({
          visible: !!value,
        });
      }
      if (value.length < 6) {
        callback('error');
      } else {
        const { form } = this.props;
        if (value && confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    }
  };

  changePrefix = (value: string) => {
    this.setState({
      prefix: value,
    });
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { help, visible } = this.state; //删除count、prefix
    return (
      <div className={styles.main}>
        <h3>
          <FormattedMessage id="user-register.register.register" />
        </h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'user-register.email.required' }),
                },
                {
                  type: 'email',
                  message: formatMessage({ id: 'user-register.email.wrong-format' }),
                },
              ],
            })(
              <Input
                size="large"
                placeholder={formatMessage({ id: 'user-register.email.placeholder' })}
              />,
            )}
          </FormItem>
          <FormItem help={help}>
            <Popover
              getPopupContainer={node => {
                if (node && node.parentNode) {
                  return node.parentNode as HTMLElement;
                }
                return node;
              }}
              content={
                <div style={{ padding: '4px 0' }}>
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>
                    <FormattedMessage id="user-register.strength.msg" />
                  </div>
                </div>
              }
              overlayStyle={{ width: 240 }}
              placement="right"
              visible={visible}
            >
              {getFieldDecorator('passwords', {
                rules: [
                  {
                    validator: this.checkPassword,
                  },
                ],
              })(
                <Input
                  size="large"
                  type="password"
                  placeholder={formatMessage({ id: 'user-register.password.placeholder' })}
                />,
              )}
            </Popover>
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: 'user-register.confirm-password.required' }),
                },
                {
                  validator: this.checkConfirm,
                },
              ],
            })(
              <Input
                size="large"
                type="password"
                placeholder={formatMessage({ id: 'user-register.confirm-password.placeholder' })}
              />,
            )}
          </FormItem>
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              <FormattedMessage id="user-register.register.register" />
            </Button>
            <Link className={styles.login} to="/user/login">
              <FormattedMessage id="user-register.register.sign-in" />
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create<userRegisterProps>()(Register);
