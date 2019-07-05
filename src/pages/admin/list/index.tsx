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

@connect(({ listState }: { listState: StateType }) => ({ listState, setReward:listState.setReward, }))
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
    const { dispatch, listState } = this.props;
    this.setState({ loading: false });
    let selectedProject = '';
    let count=this.state.selectedRowKeys.length;
    for (let i = 0; i < count; i += 1) {
      if(this.props.listState.list[i].rewardLevel===0){
        selectedProject += this.props.listState.list[i].id;
        if (i !== count - 1) {
          selectedProject += ',';
        }
      }
      else {
        count++;
      }
    }
    dispatch({
      type: 'listState/submit',
      payload: { rewardLevel:listState.setReward, rewardProject:selectedProject },
    });
  };

  handleChange=(value:number) => {
    const {listState } = this.props;
    console.log(`selected ${value}`);
    listState.setReward = value;
  }

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
    const {form} = this.props;
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

    // @ts-ignore
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: (record: { rewardLevel: number}) => ({
        disabled: record.rewardLevel !=  '0', // Column configuration not to be checked
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
              <Select  placeholder="请选择" style={{ width: 120, marginBottom:'3%', marginLeft:'1%'}} onChange={this.handleChange}>
                  <Option value="1">一等奖</Option>
                  <Option value="2">二等奖</Option>
                  <Option value="3">三等奖</Option>
              </Select>,
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