import { Card, Form } from 'antd';
import React, { Component } from 'react';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface CompetitionProps extends FormComponentProps {
  location: any;
}

// eslint-disable-next-line react/prefer-stateless-function
class CompetitionDetail extends Component<CompetitionProps> {
  render() {
    const { data } = this.props.location.state;
    console.log(data);
    return (
      <PageHeaderWrapper>
        <Card title="竞赛详情">
          <p>
            <strong>竞赛名称：{data.competitionName}</strong>
          </p>
          <p>
            <strong>开始时间：</strong>
            {data.startTimeFormat}
          </p>
          <p>
            <strong>结束时间：</strong>
            {data.endTimeFormat}
          </p>
          <p>
            <strong>竞赛简介：</strong>
            {data.description}
          </p>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<CompetitionProps>()(CompetitionDetail);
