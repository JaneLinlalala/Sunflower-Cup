import { Button, Card, DatePicker, Form, Input, message } from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import router from 'umi/router';
// eslint-disable-next-line sort-imports
import moment from 'moment';
// eslint-disable-next-line sort-imports
// import { Simulate } from 'react-dom/test-utils';
import { RangePickerValue } from 'antd/es/date-picker/interface';
import { StateType } from './model';

import styles from './style.less';
import { CompetitionListItemDataType } from '@/pages/admin/manage-competition/model';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const FormItem = Form.Item;

interface NewCompetitionProps extends FormComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>;
  newCompetition: StateType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location: any;
  submitting: boolean;
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
    submitting:
      loading.effects['newCompetition/submit'] || loading.effects['newCompetition/update'],
  }),
)
class NewCompetition extends Component<NewCompetitionProps> {
  buttonName: string;

  state: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    type: string;
  };

  constructor(props: Readonly<NewCompetitionProps>) {
    super(props);
    this.buttonName = '提交';
    console.log('this.props.location', this.props.location);
    this.state = {
      data: {
        ...this.props.location.state.data,
        time: [],
      },
      type: this.props.location.state.type,
    };
    const dateFormat = 'YYYY-MM-DD';
    if (this.state.type === 'new') {
      this.buttonName = '提交';
      this.state.data.competitionName = '';
      this.state.data.description = '';
      this.state.data.time = [];
    } else if (this.state.type === 'update') {
      this.buttonName = '修改';
      this.state.data.time = [
        moment(this.state.data.startTimeFormat, dateFormat),
        moment(this.state.data.endTimeFormat, dateFormat),
      ];
    }
    console.log('this.state.data', this.state.data);
  }

  componentDidMount(): void {
    const { form } = this.props;
    form.setFieldsValue({
      competitionName: this.state.data.competitionName,
      description: this.state.data.description,
      time: this.state.data.time,
    });
  }

  componentDidUpdate() {
    const { newCompetition } = this.props;
    if (newCompetition.status === 'ok') {
      newCompetition.status = undefined;
      message.success('提交成功！');
      router.push({
        pathname: '/admin/new-competition/new-competition-result',
      });
    } else if (newCompetition.status === 'error') {
      newCompetition.status = undefined;
      if (this.state.type === 'new') {
        message.error('竞赛名称冲突！');
        this.state.data.competitionName = '';
      } else {
        message.error('提交失败！');
      }
    }
  }

  timeOnChange = (dates: RangePickerValue, dateStrings: [string, string]) => {
    console.log('value:', dates);
    console.log('dateString:', dateStrings);
    this.state.data.time = dateStrings;
  };

  competitionNameOnChange = () => {};

  handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    const { form, dispatch } = this.props;

    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        const payed = {
          ...values,
          id: this.state.data.id,
          startTime: this.state.data.time[0],
          endTime: this.state.data.time[1],
        };
        dispatch({
          type: this.state.type === 'new' ? 'newCompetition/submit' : 'newCompetition/update',
          payload: payed,
        });
      }
    });
  };

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Card title="新建竞赛">
        <Card bordered={false} className={styles.main}>
          <Form onSubmit={this.handleClick}>
            <FormItem>
              {getFieldDecorator('competitionName', {
                rules: [
                  {
                    required: true,
                    message: '请输入竞赛名称！',
                  },
                ],
              })(<Input placeholder="竞赛名称" onChange={this.competitionNameOnChange} />)}
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
                  onChange={this.timeOnChange}
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
                {this.buttonName}
              </Button>
            </FormItem>
          </Form>
        </Card>
      </Card>
    );
  }
}

export default Form.create<NewCompetitionProps>()(NewCompetition);
