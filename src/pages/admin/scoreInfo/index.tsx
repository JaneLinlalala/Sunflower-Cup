import {
  Button,
  Card,
  Col,
  Descriptions,
  Row,
  Table,
} from 'antd';
import { GridContent, PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Component, Fragment } from 'react';

import { Dispatch } from 'redux';
import { connect } from 'dva';
import { AdvancedProfileData,ListItemDataType } from './data.d';
import styles from './style.less';



const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;
const comType = ['科技发明制作', '调查报告和学术论文'];
const proType = ['机械与控制（包括机械、仪器仪表、自动化控制、工程、交通、建筑等）', '信息技术（包括计算机、电信、通讯、电子等）','数理（包括数学、物理、地球与空间科学等）','生命科学(包括生物､农学､药学､医学､健康､卫生､食品等)','能源化工（包括能源、材料、石油、化学、化工、生态、环保等）','哲学社会科学（包括哲学、经济、社会、法律、教育、管理）'];
const subStatus=['已提交','未提交','已通过','未通过']

const columns = [
  {
    title: '评审教师',
    dataIndex: 'expertName',
  },
  {
    title: '评分',
    dataIndex: 'score',
  },
  {
    title: '评审意见',
    dataIndex: 'suggestion',
  },
];


// @ts-ignore
@connect(({profileAdvanced, loading}) => ({
    profileAdvanced,
    loading: loading.effects['profileAdvanced/fetchAdvanced'],
    data:profileAdvanced.data,
    list:profileAdvanced.list,
  }))

class Advanced extends Component<
  { loading: boolean; profileAdvanced: AdvancedProfileData; data: ListItemDataType; list:[]; dispatch: Dispatch<any> },
  {
    operationKey: string;
    stepDirection: 'horizontal' | 'vertical';
  }
> {
  public state: {
    operationKey: string;
    stepDirection: 'horizontal' | 'vertical';
    testName: string;
    loadingStatus: true;
    buttonDisabled: false;
    changeStatus:boolean;
  } = {
    operationKey: 'tab1',
    stepDirection: 'horizontal',
    testName:'xxx',
    loadingStatus: true,
    buttonDisabled: false,
    changeStatus:false,
  };

  componentDidMount() {
    const { dispatch,data,list } = this.props;
    dispatch({
      type: 'profileAdvanced/fetchScore',
      payload: {
        projectId:this.props.location.state.id,
      },
    });
    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setStepDirection);
  }

  onOperationTabChange = (key: string) => {
    this.setState({ operationKey: key });
  };

  setStepDirection = () => {
    const { stepDirection } = this.state;
    const w = getWindowWidth();
    if (stepDirection !== 'vertical' && w <= 576) {
      this.setState({
        stepDirection: 'vertical',
      });
    } else if (stepDirection !== 'horizontal' && w > 576) {
      this.setState({
        stepDirection: 'horizontal',
      });
    }
  };


  render() {
    const { profileAdvanced, loading, data,list} = this.props;


    const description = (
      <Descriptions className={styles.headerList} size="small" column={3}>
        <Descriptions.Item label="申报者">{this.props.location.state.sname}</Descriptions.Item>
        <Descriptions.Item label="作品编码">{this.props.location.state.id}</Descriptions.Item>
        <Descriptions.Item label="作品类别">{comType[this.props.location.state.type]}</Descriptions.Item>
        <Descriptions.Item label="平均分">{this.props.location.state.score}</Descriptions.Item>
      </Descriptions>
    );

    return (
      <PageHeaderWrapper
        title={this.props.location.state.pname}
        content={description}
      >
        <div
          style={{
            margin: 24,
            marginTop: 48,
          }}
          className={styles.main}
        >
          <GridContent>
            <Card
              title="评审结果"
              bordered={false}
              style={{ marginBottom: 24 }}
            >
              <Table
                style={{ marginBottom: 16 }}
                pagination={false}
                loading={loading}
                dataSource={list}
                columns={columns}
              />
            </Card>
          </GridContent>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Advanced;
