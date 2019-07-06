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
import moment from '@/pages/list/table-list';
import currentUserId from '@/utils/currentUserId';
import currentUserName from '@/utils/currentUserName';

const comType = ['科技发明制作', '调查报告和学术论文'];
const subStatus = ['未提交', '已提交', '已通过', '未通过'];

interface BasicListProps extends FormComponentProps {
  listBasicList: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}
interface BasicListState {
  visible: boolean;
  done: boolean;
  current?: Partial<BasicListItemDataType>;
  status: boolean;
}
@connect(
  ({
    listBasicList,
    loading,
  }: {
    listBasicList: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    listBasicList,
    loading: loading.models.listBasicList,
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
        studentId: currentUserId.get(),
      },
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined,
    });
  };

  showEditModal = (item: BasicListItemDataType) => {
    this.setState({
      visible: true,
      current: item,
    });
  };

  handleDone = () => {
    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
  };

  handleCancel = () => {
    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';

    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    form.validateFields((err: string | undefined, fieldsValue: BasicListItemDataType) => {
      if (err) return;
      this.setState({
        done: true,
      });
      dispatch({
        type: 'listBasicList/submit',
        payload: { id, ...fieldsValue },
      });
    });
  };

  backItem = (projectId:number) => {
    const { dispatch } = this.props;
    Modal.confirm({
      title: '撤回作品',
      content: '确定撤回该作品吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'listBasicList/back',
          payload: {projectId},
        });
        location.reload(true);
      },
    });
  };

  submitItem = () => {
    const { dispatch } = this.props;
    Modal.confirm({
      title: '提交作品',
      content: '确定提交该作品吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'listBasicList/up',
          payload: {},
        });
      },
    });
  };

  detail(pid: number) {
    const { dispatch } = this.props;
    const id = pid;
    dispatch(
      routerRedux.push({
        pathname: `/admin/advanced/${id}`,
        state: { id },
      }),
    );
  }

  select(pid: number) {
    const { dispatch } = this.props;
    const id = pid;
    dispatch(
      routerRedux.push({
        pathname: '/admin/assign-expert',
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

    const { visible, done, current = {} } = this.state;

    // @ts-ignore
    // @ts-ignore
    const columns = [
      {
        title: '项目名称',
        dataIndex: 'projectName',
      },
      {
        title: '参赛作者',
        dataIndex: 'studentName',
      },
      {
        title: '项目类别',
        dataIndex: 'competitionType',
        render: (val: number) => <span>{comType[val]}</span>,
      },
      {
        title: '状态',
        dataIndex: 'submitStatus',
        render: (val: number) => <span>{subStatus[val]}</span>,
      },
      {
        title: '操作',
        key: 'id',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.detail(record.id)}>详情</a>
            <Divider type="vertical" />
            <a
              key="delete"
              onClick={e => {
                this.backItem(record.id);
              }}
              disabled={!(record.submitStatus===1)}
            >
              撤回
            </a>
            <Divider type="vertical" />
            <a
              key="delete"
              onClick={e => {
                this.select(record.id);
              }}
              disabled={!(record.submitStatus===2)}
            >
              选择专家
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
              <Table columns={columns} dataSource={list} />
            </Card>
          </div>
        </PageHeaderWrapper>
      </>
    );
  }
}

export default Form.create<BasicListProps>()(BasicList);
