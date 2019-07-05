import { Avatar, Card, Col, List, Skeleton, Row, Statistic, Carousel } from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from 'moment';
import { ModalState } from './model';
import styles from './style.less';
import { ActivitiesType, CurrentUser, NoticeType, RadarDataType } from './data.d';
import currentUserName from '@/utils/currentUserName';
import pic from './home1.jpg';

interface DashboardWorkplaceProps {
  currentUser: CurrentUser;
  projectNotice: NoticeType[];
  activities: ActivitiesType[];
  radarData: RadarDataType[];
  dispatch: Dispatch<any>;
  currentUserLoading: boolean;
  projectLoading: boolean;
  activitiesLoading: boolean;
}

const PageHeaderContent: React.FC<{ currentUser: CurrentUser }> = ({ currentUser }) => {
  const loading = currentUser && Object.keys(currentUser).length;
  if (!loading) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          你好，
          {currentUserName.get()}
          ，祝你开心每一天！
        </div>
        <div>
          欢迎登入向日葵杯竞赛申报系统！
        </div>
      </div>
    </div>
  );
};

@connect(
  ({
    dashboardWorkplace: { currentUser, projectNotice, activities, radarData },
    loading,
  }: {
    dashboardWorkplace: ModalState;
    loading: { effects: any };
  }) => ({
    currentUser,
    projectNotice,
    activities,
    radarData,
    currentUserLoading: loading.effects['dashboardWorkplace/fetchUserCurrent'],
    projectLoading: loading.effects['dashboardWorkplace/fetchProjectNotice'],
    activitiesLoading: loading.effects['dashboardWorkplace/fetchActivitiesList'],
  }),
)
class Workplace extends Component<DashboardWorkplaceProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardWorkplace/init',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardWorkplace/clear',
    });
  }

  renderActivities = (item: ActivitiesType) => {
    const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
      if (item[key]) {
        return (
          <a href={item[key].link} key={item[key].name}>
            {item[key].name}
          </a>
        );
      }
      return key;
    });
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          title={
            <span>
              <span className={styles.event}>{events}</span>
            </span>
          }
          description={
            <span className={styles.datetime} title={item.updatedAt}>
              {moment(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };

  render() {
    const { currentUser, activities, activitiesLoading } = this.props;

    return (
      <PageHeaderWrapper content={<PageHeaderContent currentUser={currentUser} />}>
        <Card
          bodyStyle={{ padding: 0 }}
          bordered={false}
          className={styles.activeCard}
          title="动态"
          loading={activitiesLoading}
        >
          <List<ActivitiesType>
            loading={activitiesLoading}
            renderItem={item => this.renderActivities(item)}
            dataSource={activities}
            className={styles.activitiesList}
            size="large"
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Workplace;
