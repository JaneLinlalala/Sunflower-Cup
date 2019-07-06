import {
  Button,
  Card,
  Divider,
  Form,
  Modal,
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
import {routerRedux} from "dva/router";
import currentUserId from "@/utils/currentUserId";

const comType = ['科技发明制作', '调查报告和学术论文'];
const subStatus=['未提交','已提交','已通过','未通过']

interface BasicListProps extends FormComponentProps {
  listBasicList: StateType;
  dispatch: Dispatch<any>;
  loading: boolean;
}
interface BasicListState {
  visible: boolean;
  done: boolean;
  current?: Partial<BasicListItemDataType>;
  status:boolean;
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
  state: BasicListState = { visible: false, done: false, current: undefined, status:true};

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
      location.reload(true);
    });
  };

  deleteItem = (pid:number) => {
    const { dispatch } = this.props;
    Modal.confirm({
      title: '删除任务',
      content: '确定删除该任务吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {dispatch({
        type: 'listBasicList/delete',
        payload: {
          id:pid,
        },
      }); location.reload(true); },
    })
  };

  submitItem = (pid:number) => {
    const { dispatch } = this.props;
    Modal.confirm({
      title: '提交作品',
      content: '确定提交该作品吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {dispatch({
        type: 'listBasicList/up',
        payload: {
          id:pid,
        },
      }); location.reload(true);},
    });
  };

  newProject = (sid:string)=>{
    const { dispatch } = this.props;
    console.log(sid);
    dispatch({
      type: 'listBasicList/new',
      payload: {
        studentId: sid,
      },
      callback:(res:number)=>{
        console.log(res)
        dispatch(
          routerRedux.push({
            pathname: `/participant/step-form/${res}`,
            state:{res}
          })
        );
      }
    });
  };

  detail(pid:number) {
    const { dispatch } = this.props;
    const id = pid;
    dispatch(
      routerRedux.push({
        pathname: `/participant/advanced/${id}`,
        state:{id}
      })
    );
  }

  update(pid:number) {
    const { dispatch } = this.props;
    const id = pid;
    dispatch(
      routerRedux.push({
        pathname: `/participant/advanced-form/${id}`,
        state:{id}
      })
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
            <a onClick={() => this.update(record.id)} disabled={record.submitStatus}>修改</a>
            <Divider type="vertical" />
            <a onClick={() => this.detail(record.id)}>详情</a>
            <Divider type="vertical" />
            <a key="submit" onClick={e=>{this.submitItem(record.id)}}>提交</a>
            <Divider type="vertical" />
            <a key="delete" onClick={e=>{this.deleteItem(record.id)}}>删除</a>
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
              <Button icon="plus" type="primary" onClick={e=>{this.newProject(currentUserId.get())}} style={{ marginTop: '3%', marginBottom:'3%'}}>
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
