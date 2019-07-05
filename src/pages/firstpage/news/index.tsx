import { Button, Card, Form, Table } from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import router from 'umi/router';
// eslint-disable-next-line sort-imports
import { StateType, CompetitionListItemDataType } from './model';
// @ts-ignore
import styles from './style.less';
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import { Link } from "react-router-dom";
import {routerRedux} from "dva/router";

const ButtonGroup = Button.Group;

interface BasicListProps extends FormComponentProps {
  listState: StateType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>;
  location: { state: { id: string } };
}

@connect(({ listState }: { listState: StateType }) => ({ listState }))
class BasicList extends Component<BasicListProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'listState/fetch',
      payload: { projectId: '1' },
      // payload: { projectId: this.props.location.state.id },
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

  getCompetition = (record: CompetitionListItemDataType) => {
    router.push({
      pathname: '/admin/view-competition',
      state: {
        data: record,
      },
    });
  };

  getResult = (record: CompetitionListItemDataType) => {
    router.push({
      pathname: '/firstpage/competition_result',
      state: {
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
        dataIndex: 'id',
        key: 'action',
        render: (text: string, record: CompetitionListItemDataType) => (
          <span>
            <ButtonGroup>
                <Button
                  onClick={() => this.getCompetition(record)}
                >详情
              </Button>
            </ButtonGroup>
          </span>
        ),
      },
    ];

    const columns2 = [
      {
        title: '竞赛名称',
        dataIndex: 'competitionName',
      },
      {
        title: '操作',
        dataIndex: 'id',
        key: 'action',
        render: (text: string, record: CompetitionListItemDataType) => (
          <span>
            <ButtonGroup>
                <Button
                  onClick={() => this.getResult(record)}
                >查看结果
              </Button>
            </ButtonGroup>
          </span>
        ),
      },
    ];

    // @ts-ignore
    return (
        <Row gutter = {24}>
          <Col xl={14} lg={24} md={24} sm={24} xs={24}>
            <div className={styles.standardList}>
              <Card
                className={styles.listCard}
                bordered={false}
                title="竞赛列表"
                style={{ marginTop: 24 }}
                bodyStyle={{ padding: '0 32px 40px 32px' }}
              >
                <Table columns={columns} dataSource={list} />
              </Card>
            </div>
          </Col>
          <Col xl={10} lg={24} md={24} sm={24} xs={24}>
            <div className={styles.standardList}>
              <Card
                className={styles.listCard}
                bordered={false}
                title="竞赛结果公布"
                style={{ marginTop: 24 }}
                bodyStyle={{ padding: '0 32px 40px 32px' }}
              >
                <Table columns={columns2} dataSource={list} />
              </Card>
            </div>
          </Col>
        </Row>
    );
  }
}

export default Form.create<BasicListProps>()(BasicList);
