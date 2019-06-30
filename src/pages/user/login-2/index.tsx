import {Button, Col, Form, Input, Popover, Progress, Row, Select, message, Radio, Checkbox} from 'antd';
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

export interface UserRegisterParams {
  studentNumber: string;
  password: string;
  confirm: string;
  studentName: string;
  college:string;
  major:string;
  entryYear:string;
  mobile: string;
  email:string;
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

  componentDidUpdate() {
    const { userRegister, form } = this.props;
    const account = form.getFieldValue('mail');
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

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.main}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('studentNumber', {
              rules: [
                {
                  required: true,
                  message: "请输入用户名！",
                },
              ],
            })(
              <Input
                size="large"
                placeholder={"用户名"}
              />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('studentNumber', {
              rules: [
                {
                  required: true,
                  message: "请输入密码！",
                },
              ],
            })(
              <Input
                size="large"
                placeholder={"密码"}
              />,
            )}
          </FormItem>
          <Radio.Group
            style={{
              width: '100%',
              marginBottom: '24px',
              paddingLeft: '12px',
              paddingRight: '12px',
              textAlign: 'center',
            }}
          >
            <Radio style={{ float: 'left', marginRight: '0' }} value="1">
              <FormattedMessage id="参赛选手" />
            </Radio>
            <Radio style={{ position: 'static', margin: '0 auto' }} value="2">
              <FormattedMessage id="校团委" />
            </Radio>
            <Radio style={{ float: 'right', marginRight: '0' }} value="3">
              <FormattedMessage id="专家" />
            </Radio>
          </Radio.Group>
          <FormItem>
            <a style={{ float: 'left',marginLeft:'20px' }} href="">
              <FormattedMessage id="user-login.login.forgot-password" />
            </a>
            <div style={{ float: 'right', marginRight: '20px' }}>
              <Link className={styles.register} to="/user/register">
                <FormattedMessage id="user-login.login.signup" />
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
              <FormattedMessage id="user-login.login.login" />
            </Button>
        </Form>
      </div>
    );
  }
}

export default Form.create<userRegisterProps>()(Register);
