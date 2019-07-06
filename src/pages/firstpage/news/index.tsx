import { Avatar, Button, Card, Form, Table } from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import router from 'umi/router';
// eslint-disable-next-line sort-imports
import Row from 'antd/es/grid/row';
// eslint-disable-next-line sort-imports
import Col from 'antd/es/grid/col';
import currentUserName from '@/utils/currentUserName';
// eslint-disable-next-line sort-imports
import { CompetitionListItemDataType, StateType } from './model';
import styles from './style.less';

const ButtonGroup = Button.Group;

interface BasicListProps extends FormComponentProps {
  listState: StateType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>;
  location: { state: { id: string } };
  loading: boolean;
}

// eslint-disable-next-line no-empty-pattern
const PageHeaderContent: React.FC<{}> = ({}) => (
  <div className={styles.pageHeaderContent}>
    <div className={styles.avatar}>
      <Avatar
        size="large"
        src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
      />
    </div>
    <div className={styles.content}>
      <div className={styles.contentTitle}>
        你好，
        {currentUserName.get()}
        ，祝你开心每一天！
      </div>
      <div>欢迎登入向日葵杯竞赛申报系统！</div>
    </div>
  </div>
);

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

  setRowClass1 = (record: CompetitionListItemDataType, index: number) => {
    if (record.competitionStatus === 'doing') {
      return styles.greenBk;
    }
    return '';
  };

  setRowClass2 = (record: CompetitionListItemDataType, index: number) => {
    if (index === 0 && record.competitionStatus === 'over') {
      return styles.yellowBk;
    }
    return '';
  };

  render() {
    const { list } = this.props.listState;
    const { loading } = this.props;
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
              <Button onClick={() => this.getCompetition(record)}>详情</Button>
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
              <Button onClick={() => this.getResult(record)}>查看结果</Button>
            </ButtonGroup>
          </span>
        ),
      },
    ];

    // @ts-ignore
    return (
      <PageHeaderWrapper content={<PageHeaderContent />}>
        <Row gutter={24}>
          <Col xl={14} lg={24} md={24} sm={24} xs={24}>
            <div className={styles.standardList}>
              <Card
                className={styles.listCard}
                bordered={false}
                title="竞赛列表"
                style={{ marginTop: 24 }}
                bodyStyle={{ padding: '0 32px 40px 32px' }}
              >
                <Table
                  columns={columns}
                  dataSource={list}
                  loading={loading}
                  rowClassName={(record, index) => this.setRowClass1(record, index)}
                />
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
                <Table
                  columns={columns2}
                  dataSource={list}
                  loading={loading}
                  rowClassName={(record, index) => this.setRowClass2(record, index)}
                />
              </Card>
            </div>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<BasicListProps>()(BasicList);
