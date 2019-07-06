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
  adminListBasicList: StateType;
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
     adminListBasicList,
    loading,
  }: {
    adminListBasicList: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    adminListBasicList,
    loading: loading.models.adminListBasicList,
  }),
)
class BasicList extends Component<BasicListProps, BasicListState> {
  state ={
    visible: false,
    done: false,
    current: undefined,
    selectedRowKeys: [],
  };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  addBtn: HTMLButtonElement | undefined | null = undefined;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'adminListBasicList/fetch',
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
    const { dispatch, adminListBasicList} = this.props;
    this.setState({ loading: false });
    let selectedProject = '';
    let count = this.state.selectedRowKeys.length;
    for (let i = 0; i < count; i += 1) {
      selectedProject += this.props.adminListBasicList.list[this.state.selectedRowKeys[i]].id;
      if (i !== count - 1) {
        selectedProject += ',';
      }
    }
    if (this.state.selectedRowKeys.length !== 0) {
      Modal.confirm({
        title: '批量通过',
        content: '确定批量通过这些作品吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          dispatch({
            type: 'adminListBasicList/passAll',
            payload: { projectId:selectedProject },
          });
          location.reload(true);
        },
      });
    }
    else {
      Modal.error({
        title: '未选择项目！',
        content: '请选择项目后再点击确定。',
        okText: '确认',
        cancelText: '取消',
      });
    }
  };

  handleReject = (e: React.FormEvent) => {
    e.preventDefault();
    const { dispatch, adminListBasicList} = this.props;
    this.setState({ loading: false });
    let selectedProject = '';
    let count = this.state.selectedRowKeys.length;
    for (let i = 0; i < count; i += 1) {
      selectedProject += this.props.adminListBasicList.list[this.state.selectedRowKeys[i]].id;
      if (i !== count - 1) {
        selectedProject += ',';
      }
    }
    if (this.state.selectedRowKeys.length !== 0) {
      Modal.confirm({
        title: '批量不通过',
        content: '确定批量不通过这些作品吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          dispatch({
            type: 'adminListBasicList/rejectAll',
            payload: { projectId:selectedProject },
          });
          location.reload(true);
        },
      });
    }
    else{
      Modal.error({
        title: '未选择项目！',
        content: '请选择项目后再点击确定。',
        okText: '确认',
        cancelText: '取消',
      });
    }
  };

  onSelectChange = (selectedRowKeys: []) => {
    // eslint-disable-next-line no-console
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  backItem = (projectId: number) => {
    const { dispatch } = this.props;
    Modal.confirm({
      title: '撤回作品',
      content: '确定撤回该作品吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'adminListBasicList/back',
          payload: {projectId},
        });
        // eslint-disable-next-line no-restricted-globals
        location.reload(true);
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
      adminListBasicList: { list },
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
              disabled={!(record.submitStatus === 1)}
            >
              撤回
            </a>
            <Divider type="vertical" />
            <a
              key="delete"
              onClick={e => {
                this.select(record.id);
              }}
              disabled={!(record.submitStatus === 2)}
            >
              选择专家
            </a>
          </Fragment>
        ),
      },
    ];

    // @ts-ignore
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: (record: { rewardLevel: number }) => ({
        disabled: record.submitStatus !== 1, // Column configuration not to be checked
        rewardLevel: record.rewardLevel,
      }),
    };

    return (
      <>
        <PageHeaderWrapper>
          <div className={styles.standardList}>
            <Card
              className={styles.listCard}
              bordered={false}
              style={{ marginTop: 24 }}
              bodyStyle={{ padding: '40px 32px 40px 32px' }}
            >
              <Table rowSelection={rowSelection} columns={columns} dataSource={list} loading={loading} />
              <Button icon="check" type="default" onClick={this.handleSubmit} style={{width:'8.5%'}}>通过</Button>
              <Button icon="stop" type="danger" style={{marginLeft:'3%'}} onClick={this.handleReject}>不通过</Button>
            </Card>
          </div>
        </PageHeaderWrapper>
      </>
    );
  }
}

export default Form.create<BasicListProps>()(BasicList);
