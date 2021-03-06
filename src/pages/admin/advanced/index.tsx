import {
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Dropdown,
  Icon,
  Menu, Modal,
  Popover, Progress,
  Row,
  Steps,
  Table,
  Tooltip,
} from 'antd';
import { GridContent, PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Component} from 'react';

import { Dispatch } from 'redux';
import { connect } from 'dva';
import { AdvancedProfileData,ListItemDataType } from './data.d';
import styles from './style.less';



const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;
const comType = ['科技发明制作', '调查报告和学术论文'];
const displayType = ['作品可展示形式', '作品调查方式'];
const proType = ['机械与控制（包括机械、仪器仪表、自动化控制、工程、交通、建筑等）', '信息技术（包括计算机、电信、通讯、电子等）','数理（包括数学、物理、地球与空间科学等）','生命科学(包括生物､农学､药学､医学､健康､卫生､食品等)','能源化工（包括能源、材料、石油、化学、化工、生态、环保等）','哲学社会科学（包括哲学、经济、社会、法律、教育、管理）'];
const subStatus=['未提交','已提交','已通过','未通过']

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '学号',
    dataIndex: 'studentId',
    key: 'studentId',
  },
  {
    title: '现学历',
    dataIndex: 'education',
    key: 'education',
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
];

const testFriend = [
  {
    key: '1',
    name: 'xxx',
    studentId:'16211108',
    email: 'janelin9712@163.com',
    education:'本科',
    phone:'11111111111'
  },
  {
    key: '2',
    name: 'yyy',
    studentId:'16211107',
    email: '123456789@qq.com',
    education:'本科',
    phone:'22222222222'
  },
  {
    key: '3',
    name: 'zzz',
    studentId:'16211105',
    email: '123456789@qq.com',
    education:'本科',
    phone:'33333333333'
  },
];

// @ts-ignore
@connect(({profileAdvanced, loading}) => ({
    profileAdvanced,
    loading: loading.effects['profileAdvanced/fetchAdvanced'],
    data:profileAdvanced.data,
  }))

class Advanced extends Component<
  { loading: boolean; profileAdvanced: AdvancedProfileData; data: ListItemDataType; dispatch: Dispatch<any> },
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
  } = {
    operationKey: 'tab1',
    stepDirection: 'horizontal',
    testName:'xxx',
    loadingStatus: true,
    buttonDisabled: false,
  };

  componentDidMount() {
    const { dispatch} = this.props;
    dispatch({
      type: 'profileAdvanced/fetchAdvanced',
      payload: {
        id:this.props.location.state.id,
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

  download = (url:string) =>{
    const { dispatch } = this.props;
    var Url_arr = url.split(";");
    for(let i=0; i<Url_arr.length-1;i++){
      console.log(i,Url_arr[i]);
      const url= Url_arr[i]
      dispatch({
        type: 'profileAdvanced/downloadFile',
        payload: {
          url,
        },
      });
    }
  };

  pass = (pid :string) =>{
    const { dispatch } = this.props;
    Modal.confirm({
      title: '通过作品',
      content: '确定通过该作品吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {dispatch({
        type: 'profileAdvanced/passAdvanced',
        payload: {
          projectId: pid,
        },
      }); location.reload(true);},
    })
  };

  reject = (pid :string) =>{
    const { dispatch } = this.props;
    Modal.confirm({
      title: '不通过作品',
      content: '确定不通过该作品吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {dispatch({
        type: 'profileAdvanced/rejectAdvanced',
        payload: {
          projectId: pid,
        },
      }); location.reload(true);},
    });
  };

  render() {
    const { profileAdvanced, loading, data} = this.props;
    const {friends} = data;
    const pdf = "http://180.76.233.101:8080/api/DownloadPDF?id="+data.id;
    const zip = "http://180.76.233.101/uploadfile/"+data.studentId+".zip";

    const extra = (
      <Row
        style={{
          minWidth: 400,
        }}
      >
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>状态</div>
          <div className={styles.heading}>{subStatus[data.submitStatus]}</div>
        </Col>
      </Row>
    );

    const description = (
      <Descriptions className={styles.headerList} size="small" column={2}>
        <Descriptions.Item label="申报者">{data.studentName}</Descriptions.Item>
        <Descriptions.Item label="作品编码">{data.id}</Descriptions.Item>
        <Descriptions.Item label="院系名称">{data.college}</Descriptions.Item>
        <Descriptions.Item label="作品类别">{comType[data.competitionType]}</Descriptions.Item>
      </Descriptions>
    );

    return (
      <PageHeaderWrapper
        title={data.projectName}
        content={description}
        extraContent={extra}
      >
        <div
          style={{
            margin: 24,
            marginTop: 48,
          }}
          className={styles.main}
        >
          <GridContent>
            <Card title="申报者信息" style={{ marginBottom: 24 }} bordered={false}>
              <Descriptions style={{ marginBottom: 24 }}>
                <Descriptions.Item label="姓名">{data.studentName}</Descriptions.Item>
                <Descriptions.Item label="学号">{data.studentNumber}</Descriptions.Item>
                <Descriptions.Item label="出生年月">{data.birthDay}</Descriptions.Item>
                <Descriptions.Item label="现学历">{data.education}</Descriptions.Item>
                <Descriptions.Item label="专业">{data.major}</Descriptions.Item>
                <Descriptions.Item label="入学时间">{data.entryYear}</Descriptions.Item>
                <Descriptions.Item label="作品全称">{data.projectFullName}</Descriptions.Item>
                <Descriptions.Item label="联系电话">{data.phone}</Descriptions.Item>
                <Descriptions.Item label="邮箱">{data.email}</Descriptions.Item>
                <Descriptions.Item label="通讯地址">{data.address}</Descriptions.Item>
              </Descriptions>
            </Card>
            <Card
              title="合作作者信息"
              bordered={false}
              style={{ marginBottom: 24 }}
            >
              <Table
                style={{ marginBottom: 16 }}
                pagination={false}
                loading={loading}
                dataSource={data.friends}
                columns={columns}
              />
            </Card>
            <Card title="作品信息" style={{ marginBottom: 24 }} bordered={false}>
              <Descriptions style={{ marginBottom: 24 }} column={1}>
                <Descriptions.Item label="作品全称">{data.projectFullName}</Descriptions.Item>
                <Descriptions.Item label="作品分类">{proType[data.projectType]}</Descriptions.Item>
                <Descriptions.Item label={displayType[data.competitionType]}>{data.additionalMessage}</Descriptions.Item>
                <Descriptions.Item label="关键字">{data.keywords}</Descriptions.Item>
                <Descriptions.Item label="创新点">{data.invention}</Descriptions.Item>
                <Descriptions.Item label="作品总体情况说明">{data.details}</Descriptions.Item>
              </Descriptions>
            </Card>
          </GridContent>
          <div>
            <Button icon="download" type="primary" href={pdf}>
              下载表格
            </Button>
            <Button icon="download" type="primary" onClick={e=>{this.download(data.docUrl)}} style={{marginLeft:'3%'}}>
              下载pdf
            </Button>
            <Button icon="download" type="primary" onClick={e=>{this.download(data.picUrl)}} style={{marginLeft:'3%'}}>
              下载图片
            </Button>
            <Button icon="download" type="primary" onClick={e=>{this.download(data.videoUrl)}} style={{marginLeft:'3%'}}>
              下载视频
            </Button>
            <Button icon="download" type="primary" href={zip} style={{marginLeft:'3%'}}>
              打包下载
            </Button>
          </div>
          <div style={{marginTop:'2%'}}>
            <Button
              icon="check"
              type="default"
              onClick={e=>{this.pass(data.id)}}
              disabled={!(data.submitStatus===1)}
              style={{width:'9.4%'}}>
              通过
            </Button>
            <Button
              icon="stop"
              type="danger"
              style={{marginLeft:'3%',width:'9%'}}
              onClick={e=>{this.reject(data.id)}}
              disabled={!(data.submitStatus===1)}>
              拒绝
            </Button>
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Advanced;
