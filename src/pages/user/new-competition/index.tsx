import { Button, Form, Input, Select, message, DatePicker } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import router from 'umi/router';
import { StateType } from './model';

import styles from './style.less';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;
const FormItem = Form.Item;

interface NewCompetitionProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  newCompetition: StateType;
  submitting: boolean;
}

// interface NewCompetitionState {
//   count: number;
//   confirmDirty: boolean;
//   visible: boolean;
//   help: string;
//   prefix: string;
// }

export interface NewCompetitionParams {
  competitionType: string;
  competitionName: string;
  time: string;
  // prefix: string;
}

@connect(
  ({
    newCompetition,
    loading,
  }: {
    newCompetition: StateType;
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => ({
    newCompetition,
    submitting: loading.effects['newCompetition/submit'],
  }),
)
class NewCompetition extends Component<
  NewCompetitionProps
  // , NewCompetitionState
> {
  // state: NewCompetitionState = {
  //   count: 0,
  //   confirmDirty: false,
  //   visible: false,
  //   help: '',
  //   prefix: '86',
  // };

  interval: number | undefined = undefined;

  componentDidUpdate() {
    const { newCompetition, form } = this.props;
    const account = form.getFieldValue('mail');
    if (newCompetition.status === 'ok') {
      message.success('提交成功！');
      router.push({
        pathname: '/user/new-competition-result',
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

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        // const { prefix } = this.state;
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

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
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
                format="YYYY-MM-DD"
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

export default Form.create<NewCompetitionProps>()(NewCompetition);
