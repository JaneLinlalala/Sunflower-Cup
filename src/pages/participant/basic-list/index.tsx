import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker, Divider,
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
  Table
} from 'antd';
import React, {Component, Fragment} from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { StateType } from './model';
import { BasicListItemDataType } from './data.d';
import styles from './style.less';

const comType = ['科技发明制作', '调查报告和学术论文'];
const subStatus=['未提交','已提交']

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
        count: 5,
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

  deleteItem = () => {
    const { dispatch } = this.props;
    Modal.confirm({
      title: '删除任务',
      content: '确定删除该任务吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {dispatch({
        type: 'listBasicList/delete',
        payload: {
        },
      })},
    });
  };

  submitItem = () => {
    const { dispatch } = this.props;
    Modal.confirm({
      title: '提交作品',
      content: '确定提交该作品吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {dispatch({
        type: 'listBasicList/up',
        payload: {
        },
      })},
    });
  };

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
        render: competitionType=>comType[competitionType]
      },
      {
        title: '状态',
        dataIndex: 'submitStatus',
        render: submitStatus => subStatus[submitStatus]
      },
      {
        title: '操作',
        key: 'id',
        render: (text, record) => (
          <Fragment>
            <a href="/participant/step-form">修改</a>
            <Divider type="vertical" />
            <a key="submit" onClick={e=>{this.submitItem()}}>提交</a>
            <Divider type="vertical" />
            <a key="delete" onClick={e=>{this.deleteItem()}}>删除</a>
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
              <Button icon="plus" type="primary"  href="/participant/step-form" style={{ marginTop: '3%', marginBottom:'3%'}}>
                新建
              </Button>
              <Table columns={columns} dataSource={list}/>
            </Card>
          </div>
        </PageHeaderWrapper>
      </>
    );
  }
}

export default Form.create<BasicListProps>()(BasicList);
