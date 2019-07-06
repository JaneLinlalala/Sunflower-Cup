import { Button, Card, Form, Table, Empty,Divider } from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import router from 'umi/router';
// eslint-disable-next-line sort-imports
import { StateType1, StateType2, CompetitionResultListItemDataType, CompetitionListItemDataType } from './model';
// @ts-ignore
import styles from './style.less';
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import { Link } from "react-router-dom";
import {routerRedux} from "dva/router";
import Exception from "@/pages/exception/500/components/Exception";
import {formatMessage} from 'umi-plugin-locale';

const namespace = 'competitionResult';

interface BasicListProps extends FormComponentProps {
  listState: StateType2;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>;
  location: { state: { id: string } };
}

@connect(({ competitionResult }: { competitionResult: StateType2 }) => ({ competitionResult }))
class BasicList extends Component<BasicListProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    console.log(this.props.location.state.data.id);
    dispatch({
      type: 'competitionResult/fetchState',
      payload: this.props.location.state.data.id,
      // payload: { projectId: this.props.location.state.id },
    });
    dispatch({
      type: 'competitionResult/fetch',
      payload: this.props.location.state.data.id,
      // payload: { projectId: this.props.location.state.id },
    });
  }

  render() {
    console.log(this.props);
    const { list01, list02, list03, list11, list12, list13 } = this.props.competitionResult;

    const columns = [
      {
        title: '项目编号',
        dataIndex: 'id',
      },
      {
        title: '项目名称',
        dataIndex: 'projectName',
      },
      {
        title: '项目作者',
        dataIndex: 'studentName',
      },
    ];

    if(this.props.competitionResult.competitionState === 'doing')
    {
      return (
        <Empty>
          比赛结果还未公布，请耐心等待
        </Empty>

      );
    }else  return (
      <PageHeaderWrapper>
        <div className={styles.main}>
          <Card
            bordered={false}
            title="科技发明制作"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '40px 32px 40px 32px' }}
          >
            <Card title='一等奖' >
              <Table columns={columns} dataSource={list01}/>
            </Card>
            <Card title='二等奖' style={{ marginTop: 24 }}>
              <Table columns={columns} dataSource={list02} bordered={false}/>
            </Card>
            <Card title='三等奖' style={{ marginTop: 24 }}>
              <Table columns={columns} dataSource={list03} bordered={false}/>
            </Card>
          </Card>
          <Card
            className={styles.listCard}
            bordered={false}
            title="调查报告和学术论文"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '40px 32px 40px 32px' }}
          >
            <Card title='一等奖'>
              <Table columns={columns} dataSource={list11} bordered={false}/>
            </Card>
            <Card title='二等奖'  style={{ marginTop: 24 }}>
              <Table columns={columns} dataSource={list12} bordered={false}/>
            </Card>
            <Card title='三等奖'  style={{ marginTop: 24 }}>
              <Table columns={columns} dataSource={list13} bordered={false}/>
            </Card>
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<BasicListProps>()(BasicList);
