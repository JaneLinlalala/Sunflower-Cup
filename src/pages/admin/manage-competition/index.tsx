import { Button, Card, Form, Table } from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import router from 'umi/router';
// eslint-disable-next-line sort-imports
import { CompetitionListItemDataType, StateType } from './model';
// @ts-ignore
import styles from './style.less';

const ButtonGroup = Button.Group;

interface BasicListProps extends FormComponentProps {
  listState: StateType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>;
  location: { state: { id: string } };
  loading: boolean;
}

@connect(
  ({
    listState,
    loading,
  }: {
    listState: StateType;
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => ({
    listState,
    loading: loading.effects['listState/fetch'],
  }),
)
class BasicList extends Component<BasicListProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'listState/fetch',
    });
  }

  handleNewCompetition = (e: React.FormEvent) => {
    e.preventDefault();
    router.push({
      pathname: '/admin/new-competition',
      state: {
        type: 'new',
        data: {},
      },
    });
  };

  handleView = (record: CompetitionListItemDataType) => {
    router.push({
      pathname: '/admin/view-competition',
      state: {
        data: record,
      },
    });
  };

  handleUpdate = (record: CompetitionListItemDataType) => {
    router.push({
      pathname: '/admin/new-competition',
      state: {
        type: 'update',
        data: record,
      },
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isDisableButton = (record: CompetitionListItemDataType) =>
    this.props.listState.list.indexOf(record) !== 0;

  render() {
    const { list } = this.props.listState;
    console.log(list);
    const columns = [
      {
        title: '竞赛名称',
        dataIndex: 'competitionName',
      },
      {
        title: '开始时间',
        dataIndex: 'startTimeFormat',
      },
      {
        title: '结束时间',
        dataIndex: 'endTimeFormat',
      },
      {
        title: '操作',
        key: 'action',
        render: (text: string, record: CompetitionListItemDataType) => (
          <span>
            <ButtonGroup>
              <Button
                onClick={() => {
                  this.handleView(record);
                }}
              >
                查看
              </Button>
              <Button
                onClick={() => {
                  this.handleUpdate(record);
                }}
                disabled={this.isDisableButton(record)}
              >
                编辑
              </Button>
            </ButtonGroup>
          </span>
        ),
      },
    ];

    // @ts-ignore
    return (
      <PageHeaderWrapper>
        <Card
          className={styles.listCard}
          bordered={false}
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: '0 32px 40px 32px' }}
        >
          <Button
            type="primary"
            onClick={this.handleNewCompetition}
            style={{ margin: '24px', marginLeft: '0px' }}
          >
            新建竞赛
          </Button>
          <Table columns={columns} dataSource={list} loading={this.props.loading} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<BasicListProps>()(BasicList);
