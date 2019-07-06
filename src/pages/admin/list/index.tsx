import { Button, Card, Divider, Form, Modal, Select, Table } from 'antd';
import React, { Component, Fragment } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
// eslint-disable-next-line sort-imports
import { routerRedux } from 'dva/router';
import { Simulate } from 'react-dom/test-utils';
import { StateType } from './model';
import styles from './style.less';

import load = Simulate.load;
const { Option } = Select;
const comType = ['科技发明制作', '调查报告和学术论文'];
const subStatus = ['未提交', '已提交', '已通过', '未通过'];
const rewardStatus = ['未获奖', '一等奖', '二等奖', '三等奖'];

interface BasicListProps extends FormComponentProps {
  resultListState: StateType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>;
  location: { state: { id: string } };
  tableLoading: boolean;
}

@connect(
  ({
    resultListState,
    loading,
  }: {
    resultListState: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    resultListState,
    setReward: resultListState.setReward,
    tableLoading: loading.effects['resultListState/fetch'],
  }),
)
class BasicList extends Component<BasicListProps> {
  state = {
    selectedRowKeys: [],
    loading: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'resultListState/fetch',
      // payload: { projectId: this.props.location.state.id},
    });
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { dispatch, resultListState } = this.props;
    this.setState({ loading: false });
    let selectedProject = '';
    let count = this.state.selectedRowKeys.length;
    for (let i = 0; i < count; i += 1) {
      if (this.props.resultListState.list[i].rewardLevel === 0) {
        selectedProject += this.props.resultListState.list[i].id;
        if (i !== count - 1) {
          selectedProject += ',';
        }
      } else {
        // eslint-disable-next-line no-plusplus
        count++;
      }
    }
    if (this.state.selectedRowKeys.length !== 0) {
      Modal.confirm({
        title: '设置奖项',
        content: '确定设置该奖项吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          dispatch({
            type: 'resultListState/submit',
            payload: { rewardLevel: resultListState.setReward, rewardProject: selectedProject },
          });
          // eslint-disable-next-line no-restricted-globals
          location.reload(true);
        },
      });
    } else {
      Modal.error({
        title: '未选择项目！',
        content: '请选择项目后再点击确定。',
        okText: '确认',
        cancelText: '取消',
      });
    }
  };

  confirmSubmit = () => {
    const { dispatch } = this.props;
    // eslint-disable-next-line no-restricted-globals
    location.reload(true);
    Modal.confirm({
      title: '发布结果',
      content: '确定发布该决赛结果吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'resultListState/finish',
        });
        // eslint-disable-next-line no-restricted-globals
        location.reload(true);
      },
    });
  };

  handleChange = (value: number) => {
    const { resultListState } = this.props;
    console.log(`selected ${value}`);
    resultListState.setReward = value;
  };

  onSelectChange = (selectedRowKeys: []) => {
    // eslint-disable-next-line no-console
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  detail(pid: string, pname: string, sname: string, type: number, score: string) {
    const { dispatch } = this.props;
    const id = pid;
    dispatch(
      routerRedux.push({
        pathname: `/admin/scoreInfo/${id}`,
        state: { id, pname, sname, type, score },
      }),
    );
  }

  render() {
    const { loading } = this.state;
    const { list, comStatus } = this.props.resultListState;
    const { tableLoading } = this.props;
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
        title: '平均分',
        dataIndex: 'averageScore',
        render: (val: string) => `${val} 分`,
      },
      {
        title: '获奖情况',
        dataIndex: 'rewardLevel',
        render: (val: number) => <span>{rewardStatus[val]}</span>,
      },
      {
        title: '操作',
        key: 'id',
        render: (text, record) => (
          <Fragment>
            <a
              onClick={() =>
                this.detail(
                  record.id,
                  record.projectName,
                  record.studentName,
                  record.competitionType,
                  record.averageScore,
                )
              }
            >
              详情
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
        disabled: record.rewardLevel !== '0', // Column configuration not to be checked
        rewardLevel: record.rewardLevel,
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
            bodyStyle={{ padding: '40px 32px 40px 32px' }}
          >
            <div>
              奖项：
              <Select
                placeholder="请选择"
                style={{ width: 120, marginBottom: '3%', marginLeft: '1%' }}
                onChange={this.handleChange}
              >
                <Option value="1">一等奖</Option>
                <Option value="2">二等奖</Option>
                <Option value="3">三等奖</Option>
              </Select>
              ,
            </div>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={list}
              loading={tableLoading}
            />
            <Button icon="check" type="primary" onClick={this.handleSubmit} loading={loading}>
              确定
            </Button>
            <Button
              icon="notification"
              type="primary"
              onClick={this.confirmSubmit}
              loading={loading}
              style={{ marginLeft: '3%' }}
              disabled={comStatus}
            >
              发布
            </Button>
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<BasicListProps>()(BasicList);
