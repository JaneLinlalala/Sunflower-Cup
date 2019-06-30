import {
  Button,
  DatePicker,
  Form,
  Input,
  // Progress,
  Select,
  message,
} from 'antd';

import { FormattedMessage } from 'umi-plugin-react/locale';
// eslint-disable-next-line sort-imports
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import router from 'umi/router';

// eslint-disable-next-line sort-imports
import { StateType } from './model';
import styles from './style.less';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const FormItem = Form.Item;
const { Option } = Select;
// const InputGroup = Input.Group;

// const passwordProgressMap: {
//   ok: 'success';
//   pass: 'normal';
//   poor: 'exception';
// } = {
//   ok: 'success',
//   pass: 'normal',
//   poor: 'exception',
// };

interface NewCompetitionProps extends FormComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>;
  userRegister: StateType;
  submitting: boolean;
}

// interface UserRegisterState {
//   count: number;
//   confirmDirty: boolean;
//   visible: boolean;
//   help: string;
//   prefix: string;
// }
//
export interface NewCompetitionParams {
  competitionName: string;
  competitionType: string;
  time: string;
  description: string;
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
class NewCompetition extends Component<
  NewCompetitionProps
  // , UserRegisterState
> {
  // state: UserRegisterState = {
  //   count: 0,
  //   confirmDirty: false,
  //   visible: false,
  //   help: '',
  //   prefix: '86',
  // };

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

  // onGetCaptcha = () => {
  //   let count = 59;
  //   this.setState({ count });
  //   this.interval = window.setInterval(() => {
  //     count -= 1;
  //     this.setState({ count });
  //     if (count === 0) {
  //       clearInterval(this.interval);
  //     }
  //   }, 1000);
  // };

  // getPasswordStatus = () => {
  //   const { form } = this.props;
  //   const value = form.getFieldValue('password');
  //   if (value && value.length > 9) {
  //     return 'ok';
  //   }
  //   if (value && value.length > 5) {
  //     return 'pass';
  //   }
  //   return 'poor';
  // };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        // const {prefix} = this.state;
        dispatch({
          type: 'newCompetition/submit',
          payload: {
            ...values,
            // prefix,
          },
        });
      }
    });
  };

  // checkConfirm = (rule: any, value: string, callback: (messgae?: string) => void) => {
  //   const { form } = this.props;
  //   if (value && value !== form.getFieldValue('password')) {
  //     callback(formatMessage({ id: 'user-register.password.twice' }));
  //   } else {
  //     callback();
  //   }
  // };
  //
  // checkPassword = (rule: any, value: string, callback: (messgae?: string) => void) => {
  //   const { visible, confirmDirty } = this.state;
  //   if (!value) {
  //     this.setState({
  //       help: formatMessage({ id: 'user-register.password.required' }),
  //       visible: !!value,
  //     });
  //     callback('error');
  //   } else {
  //     this.setState({
  //       help: '',
  //     });
  //     if (!visible) {
  //       this.setState({
  //         visible: !!value,
  //       });
  //     }
  //     if (value.length < 6) {
  //       callback('error');
  //     } else {
  //       const { form } = this.props;
  //       if (value && confirmDirty) {
  //         form.validateFields(['confirm'], { force: true });
  //       }
  //       callback();
  //     }
  //   }
  // };

  // changePrefix = (value: string) => {
  //   this.setState({
  //     prefix: value,
  //   });
  // };
  //
  // renderPasswordProgress = () => {
  //   const { form } = this.props;
  //   const value = form.getFieldValue('password');
  //   const passwordStatus = this.getPasswordStatus();
  //   return value && value.length ? (
  //     <div className={styles[`progress-${passwordStatus}`]}>
  //       <Progress
  //         status={passwordProgressMap[passwordStatus]}
  //         className={styles.progress}
  //         strokeWidth={6}
  //         percent={value.length * 10 > 100 ? 100 : value.length * 10}
  //         showInfo={false}
  //       />
  //     </div>
  //   ) : null;
  // };

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    // const { count, prefix, help, visible } = this.state;
    return (
      <div className={styles.main}>
        <h3>
          <FormattedMessage
            // @ts-ignore
            id="新建竞赛"
          />
        </h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('competitionType', {
              rules: [
                {
                  required: true,
                  message: '请选择竞赛类别！',
                },
              ],
            })(
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="竞赛类别"
                optionFilterProp="children"
                // onChange={onChange}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // onSearch={onSearch}
                filterOption={(input, option) =>
                  // @ts-ignore
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('competitionName', {
              rules: [
                {
                  required: true,
                  message: '请输入竞赛名称！',
                },
              ],
            })(<Input placeholder="竞赛名称" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('time', {
              rules: [
                {
                  required: true,
                  message: '请填写竞赛时间！',
                },
              ],
            })(
              <RangePicker
                style={{ width: '100%' }}
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                placeholder={['竞赛开始时间', '竞赛结束时间']}
                // onChange={onChange}
                // onOk={onOk}
              />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('description', {
              rules: [
                {
                  required: true,
                  message: '请输入竞赛描述！',
                },
              ],
            })(<TextArea placeholder="竞赛描述" rows={4} />)}
          </FormItem>
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              <FormattedMessage
                // @ts-ignore
                id="提交"
              />
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

// @ts-ignore
export default Form.create<NewCompetitionProps>()(NewCompetition);
