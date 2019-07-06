import { Button, Form, Input, Popover, Radio, message } from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import Link from 'umi/link';
import { connect } from 'dva';

import { StateType } from './model';
import styles from './style.less';

const FormItem = Form.Item;

interface UserLoginProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  login: StateType;
  submitting: boolean;
}
interface UserLoginState {
  count: number;
  confirmDirty: boolean;
  visible: boolean;
  help: string;
  prefix: string;
}

export interface UserLoginParams {
  userNumber: string;
  passwords: string;
  userType: string;
}

@connect(
  ({
    login,
    loading,
  }: {
    login: StateType;
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => ({
    login,
    submitting: loading.effects['login/submit'],
  }),
)
class Register extends Component<UserLoginProps, UserLoginState> {
  state: UserLoginState = {
    // eslint-disable-next-line react/no-unused-state
    count: 0,
    // eslint-disable-next-line react/no-unused-state
    confirmDirty: false,
    // eslint-disable-next-line react/no-unused-state
    visible: false,
    // eslint-disable-next-line react/no-unused-state
    help: '',
    prefix: '86',
  };

  interval: number | undefined = undefined;

  componentDidUpdate() {
    const { login, form } = this.props;
    if (login.status === 'ok') {
      message.success('登录成功！');
      login.status = undefined;
    } else if (login.status === 'error') {
      message.error('登陆失败！');
      login.status = undefined;
    } else if (login.status === 'out') {
      message.error('已退出登录！');
      login.status = undefined;
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () => {
    let count = 59;
    // eslint-disable-next-line react/no-unused-state
    this.setState({ count });
    this.interval = window.setInterval(() => {
      count -= 1;
      // eslint-disable-next-line react/no-unused-state
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const { prefix } = this.state;
        dispatch({
          type: 'login/submit',
          payload: {
            ...values,
            prefix,
          },
        });
      }
    });
  };

  render() {
    const { form, submitting } = this.props;
    const { visible } = this.state;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.main}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [
                {
                  required: true,
                  message: '请输入用户名！',
                },
              ],
            })(<Input size="large" placeholder="用户名" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('passwords', {
              rules: [
                {
                  required: true,
                  message: '请输入密码！',
                },
              ],
            })(<Input type="password" size="large" placeholder="密码" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('userType', {
              rules: [
                {
                  required: true,
                  message: '请选择身份！',
                },
              ],
            })(
              <Radio.Group
                style={{
                  width: '100%',
                  paddingLeft: '12px',
                  paddingRight: '12px',
                  textAlign: 'center',
                }}
              >
                <Radio style={{ float: 'left', marginRight: '0' }} value="0">
                  参赛选手
                </Radio>
                <Radio style={{ float: 'left', marginLeft: '17%' }} value="1">
                  专家
                </Radio>
                <Radio style={{ float: 'right', marginRight: '0' }} value="2">
                  校团委
                </Radio>
              </Radio.Group>,
            )}
          </FormItem>
          <FormItem>
            <a style={{ float: 'left', marginLeft: '20px' }} href="">
              忘记密码
            </a>
            <div style={{ float: 'right', marginRight: '20px' }}>
              <Link className={styles.register} to="/user/register">
                用户注册
              </Link>
            </div>
          </FormItem>
          <Button
            size="large"
            loading={submitting}
            className={styles.submit}
            type="primary"
            htmlType="submit"
          >
            登录
          </Button>
        </Form>
      </div>
    );
  }
}

export default Form.create<UserLoginProps>()(Register);
