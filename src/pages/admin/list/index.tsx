import {Button, Card, Divider, Form, Modal, Table, Select} from 'antd';
import React, {Component, Fragment} from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
// eslint-disable-next-line sort-imports
import { StateType } from './model';
import styles from './style.less';
import {routerRedux} from "dva/router";
const { Option } = Select;

interface BasicListProps extends FormComponentProps {
  listState: StateType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>;
  location: {state:{id:string}}
}

@connect(({ listState }: { listState: StateType }) => ({ listState }))
class BasicList extends Component<BasicListProps> {
  state = {
    selectedRowKeys: [],
    loading: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'listState/fetch',
      // payload: { projectId: this.props.location.state.id},
    });
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { dispatch } = this.props;
    if (this.state.selectedRowKeys.length >= 3) {
      Modal.confirm({
        title: '发布决赛结果',
        content: '确定发布决赛结果吗吗？',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          this.setState({ loading: false });
          let selectedEmail = '';
          for (let i = 0; i < this.state.selectedRowKeys.length; i += 1) {
            selectedEmail += this.props.listState.list[i].email;
            if (i !== this.state.selectedRowKeys.length - 1) {
              selectedEmail += ',';
            }
          }
          dispatch({
            type: 'listState/submit',
            payload: { receivers: selectedEmail },
          });
        },
        onCancel: () => {
          this.setState({ loading: false });
        },
      });
    } else {
      Modal.info({
        title: '选择的人数过少',
        content: (
          <div>
            <p> 选择的专家少于3人，请重新选择 </p>
          </div>
        ),
        onOk: () => {
          this.setState({ loading: false });
        },
      });
    }
  };

  onSelectChange = (selectedRowKeys: []) => {
    // eslint-disable-next-line no-console
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  detail(pid: string, pname:string, sname:string, type:number, score:string) {
    const { dispatch } = this.props;
    const id = pid;
    dispatch(
      routerRedux.push({
        pathname: `/admin/scoreInfo/${id}`,
        state: { id,pname, sname, type, score},
      }),
    );
  }

  render() {
    const { loading } = this.state;
    const { list } = this.props.listState;
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
      },
      {
        title: '平均分',
        dataIndex: 'averageScore',
      },
      {
        title: '获奖情况',
        dataIndex: 'rewardLevel',
      },
      {
        title: '操作',
        key: 'id',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.detail(record.id, record.projectName, record.studentName, record.competitionType, record.averageScore)}>详情</a>
          </Fragment>
        ),
      },
    ];
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: (record: { name: string }) => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    function handleChange(value) {
      console.log(`selected ${value}`);
    }
    // @ts-ignore
    return (
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '40px 32px 40px 32px' }}
          >
            <div>
              奖项：
              <Select  placeholder="请选择" style={{ width: 120, marginBottom:'3%', marginLeft:'1%'}} onChange={handleChange}>
                <Option value="1">一等奖</Option>
                <Option value="2">二等奖</Option>
                <Option value="3">三等奖</Option>
              </Select>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={list} />
            <Button icon="check" type="primary" onClick={this.handleSubmit} loading={loading}>
              确定
            </Button>
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<BasicListProps>()(BasicList);
