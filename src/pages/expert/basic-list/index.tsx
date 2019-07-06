import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Icon,
  Input,
  List,
  Menu,
  Modal,
  Progress,
  Radio,
  Row,
  Select,
  Table,
} from 'antd';
import React, { Component, Fragment } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { StateType } from './model';
import { BasicListItemDataType } from './data.d';
import styles from './style.less';
import currentUserId from '@/utils/currentUserId';

const comType = ['科技发明制作', '调查报告和学术论文'];
const subStatus = ['已提交', '未提交'];

interface BasicListProps extends FormComponentProps {
  listBasicList: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}
interface BasicListState {
  visible: boolean;
  done: boolean;
  current?: Partial<BasicListItemDataType>;
}
@connect(
  ({
    listBasicList,
    loading,
  }: {
    listBasicList: StateType;
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => ({
    listBasicList,
    loading: loading.effects['listBasicList/fetch'],
  }),
)
class BasicList extends Component<BasicListProps, BasicListState> {
  state: BasicListState = { visible: false, done: false, current: undefined };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  addBtn: HTMLButtonElement | undefined | null = undefined;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'listBasicList/fetch',
      payload: {
        expertId: currentUserId.get(),
      },
    });
  }


  submitItem = (judgeId:number) => {
    const { dispatch } = this.props;
    Modal.confirm({
      title: '提交评审',
      content: '确定提交该评审结果吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'listBasicList/up',
          payload: {judgeId},
        });location.reload(true);
      },
    });
  };

  detail(pid: number) {
    const { dispatch } = this.props;
    const id = pid;
    console.log(id);
    dispatch(
      routerRedux.push({
        pathname: `/expert/advanced/${id}`,
        state: { id },
      }),
    );
  }

  render() {
    const {
      listBasicList: { list },
      loading,
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;

    // @ts-ignore
    // @ts-ignore
    const columns = [
      {
        title: '项目名称',
        dataIndex: 'projectName',
      },
      {
        title: '项目类别',
        dataIndex: 'competitionType',
        render: (val: number) => <span>{comType[val]}</span>,
      },
      {
        title: '关键字',
        dataIndex: 'keywords',
      },
      {
        title: '状态',
        dataIndex: 'judgeStatus',
        render: (val: number) => <span>{subStatus[val]}</span>,
      },
      {
        title: '操作',
        key: 'id',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.detail(record.projectId)} disabled={!record.judgeStatus}>评审</a>
            <Divider type="vertical" />
            <a
              key="submit"
              onClick={e => {
                this.submitItem(record.judgeId);
              }}
              disabled={!record.judgeStatus}
            >
              提交
            </a>
          </Fragment>
        ),
      },
    ];

    return (
      <>
        <PageHeaderWrapper>
          <div className={styles.standardList}>
            <Card
              className={styles.listCard}
              bordered={false}
              style={{ marginTop: 24 }}
              bodyStyle={{ padding: '0 32px 40px 32px' }}
            >
              <Table columns={columns} dataSource={list} loading={loading} />
            </Card>
          </div>
        </PageHeaderWrapper>
      </>
    );
  }
}

export default Form.create<BasicListProps>()(BasicList);
