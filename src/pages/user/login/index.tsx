import {Button, Form, Input, Radio, message, Popover} from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import Link from 'umi/link';
import { connect } from 'dva';
import router from 'umi/router';

import { StateType } from './model';
import styles from './style.less';

const FormItem = Form.Item;

interface UserLoginProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  userLogin: StateType;
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
    userLogin,
    loading,
  }: {
    userLogin: StateType;
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => ({
    userLogin,
    submitting: loading.effects['userLogin/submit'],
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
    const { userLogin, form } = this.props;
    const account = form.getFieldValue('mail');
    if (userLogin.status != 'error' && userLogin.status !=null) {
      message.success('登录成功！');
      // let path = '';
      // const type = form.getFieldsValue().userType;
      // if (type === '0') path = '/participant/step-form';
      // else if (type === '1') path = '/expert-assign';
      // else path = '/new-competition';
      //
      // router.push({
      //   pathname: path,
      //   state: {
      //     account,
      //   },
      // });
    }
    else if(userLogin.status === 'error'){
      message.error('登陆失败！');
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
          type: 'userLogin/submit',
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
