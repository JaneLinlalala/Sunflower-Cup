import { Button, Card, Form, Modal, Table } from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
// eslint-disable-next-line sort-imports
import { StateType } from './model';
import styles from './style.less';

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
      // payload: { projectId: '1' },
      payload: { projectId: this.props.location.state.id},
    });
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { dispatch } = this.props;
    if (this.state.selectedRowKeys.length >= 3) {
      Modal.confirm({
        title: '发送邮件',
        content: '确定向选择的专家发送邮件吗？',
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

  render() {
    const { loading } = this.state;
    const { list } = this.props.listState;
    const columns = [
      {
        title: '专家姓名',
        dataIndex: 'name',
      },
      {
        title: '专业',
        dataIndex: 'major',
      },
      {
        title: '邮件',
        dataIndex: 'email',
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
    // @ts-ignore
    return (
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
          >
            <Table rowSelection={rowSelection} columns={columns} dataSource={list} />
            <Button type="primary" onClick={this.handleSubmit} loading={loading}>
              发送邮件
            </Button>
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<BasicListProps>()(BasicList);
