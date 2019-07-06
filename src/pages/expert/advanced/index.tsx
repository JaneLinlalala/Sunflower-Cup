import {
  Button,
  Card,
  Col,
  Descriptions,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Table,
  message,
} from 'antd';
import { GridContent, PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
// eslint-disable-next-line sort-imports
import { FormComponentProps } from 'antd/es/form';
import { AdvancedProfileData, AppraiseData, ListItemDataType } from './data.d';
import currentUserId from '@/utils/currentUserId';
import styles from './style.less';

const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;
const comType = ['科技发明制作', '调查报告和学术论文'];
const displayType = ['作品可展示形式', '作品调查方式'];
const proType = [
  '机械与控制（包括机械、仪器仪表、自动化控制、工程、交通、建筑等）',
  '信息技术（包括计算机、电信、通讯、电子等）',
  '数理（包括数学、物理、地球与空间科学等）',
  '生命科学(包括生物､农学､药学､医学､健康､卫生､食品等)',
  '能源化工（包括能源、材料、石油、化学、化工、生态、环保等）',
  '哲学社会科学（包括哲学、经济、社会、法律、教育、管理）',
];
const subStatus=['未提交','已提交','已通过','未通过'];
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
    studentId: '16211108',
    email: 'janelin9712@163.com',
    education: '本科',
    phone: '11111111111',
  },
  {
    key: '2',
    name: 'yyy',
    studentId: '16211107',
    email: '123456789@qq.com',
    education: '本科',
    phone: '22222222222',
  },
  {
    key: '3',
    name: 'zzz',
    studentId: '16211105',
    email: '123456789@qq.com',
    education: '本科',
    phone: '33333333333',
  },
];
const FormItem = Form.Item;

interface AdvancedProps extends FormComponentProps {
  loading: boolean;
  profileAdvanced: AdvancedProfileData;
  data: ListItemDataType;
  file: File;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  location: any;
  fetchAppraiseLoading: boolean;
  saveAppraiseLoading: boolean;
}

// @ts-ignore
@connect(
  ({
    profileAdvanced,
    loading,
  }: {
    profileAdvanced: AdvancedProfileData;
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => ({
    profileAdvanced,
    loading: loading.effects['profileAdvanced/fetchAdvanced'],
    data: profileAdvanced.data,
    file: profileAdvanced.file,

    fetchAppraiseLoading: loading.effects['profileAdvanced/fetchAppraise'],
    saveAppraiseLoading: loading.effects['profileAdvanced/saveAppraise'],
  }),
)
class Advanced extends Component<AdvancedProps> {
  state: {
    stepDirection: 'horizontal' | 'vertical';
    visible: false;

    appraise: AppraiseData;
  };

  constructor(props: Readonly<AdvancedProps>) {
    super(props);
    this.state = {
      stepDirection: 'horizontal',
      visible: false,
      appraise: this.props.profileAdvanced.appraise,
    };
  }

  componentDidMount() {
    const { dispatch, form } = this.props;
    const { saveAppraiseStatus, fetchAppraiseStatus } = this.props.profileAdvanced;

    dispatch({
      type: 'profileAdvanced/fetchAdvanced',
      payload: {
        id: this.props.location.state.id,
      },
    });
    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection, { passive: true });

    console.log('fetchAppraiseStatus', fetchAppraiseStatus);

    // if (fetchAppraiseStatus === 'success') {
    //   form.setFieldsValue(this.state.appraise);
    // }
  }

  componentDidUpdate(): void {
    const { form } = this.props;
    const { fetchAppraiseLoading } = this.props;
    const { saveAppraiseStatus, fetchAppraiseStatus } = this.props.profileAdvanced;
    if (fetchAppraiseStatus === 'first') {
      this.props.profileAdvanced.fetchAppraiseStatus = undefined;
      // console.log('this.props.profileAdvanced', this.props.profileAdvanced);
      this.state.appraise = this.props.profileAdvanced.appraise;
      form.setFieldsValue(this.state.appraise);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ visible: true });
    }
    if (saveAppraiseStatus === 'success') {
      this.props.profileAdvanced.saveAppraiseStatus = undefined;
      message.success('提交成功');
      if (this.state.visible) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ visible: false });
      }
    } else if (saveAppraiseStatus !== undefined) {
      this.props.profileAdvanced.saveAppraiseStatus = undefined;
      message.error('提交失败');
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setStepDirection);
  }

  // eslint-disable-next-line react/sort-comp
  showModal = () => {
    const { dispatch } = this.props;
    if (this.props.profileAdvanced.fetchAppraiseStatus !== 'first') {
      dispatch({
        type: 'profileAdvanced/fetchAppraise',
        payload: {
          expertId: currentUserId.get(),
          projectId: this.props.location.state.id,
          // projectId: 13,
        },
      });
    } else {
      this.setState({ visible: true });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleOk = (e: any) => {
    e.preventDefault();
    const { dispatch, form } = this.props;

    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        dispatch({
          type: 'profileAdvanced/saveAppraise',
          payload: {
            ...values,
            expertId: currentUserId.get(),
            projectId: this.props.location.state.id,
            // projectId: 13,
          },
        });
      }
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
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

  download = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'profileAdvanced/downloadFile',
      payload: {},
    });
  };

  render() {
    const { visible } = this.state;
    const { loading, data, form } = this.props;
    const { getFieldDecorator } = form;

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

    const { TextArea } = Input;

    return (
      <PageHeaderWrapper title="作品名称" content={description} extraContent={extra}>
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
            <Card title="合作作者信息" bordered={false} style={{ marginBottom: 24 }}>
              <Table
                style={{ marginBottom: 16 }}
                pagination={false}
                loading={loading}
                dataSource={testFriend}
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
          <Button
            icon="download"
            type="primary"
            onClick={e => {
              this.download();
            }}
          >
            下载
          </Button>
          <Button
            icon="edit"
            type="primary"
            loading={this.props.fetchAppraiseLoading}
            onClick={e => {
              this.showModal();
            }}
            style={{ marginLeft: '3%' }}
          >
            评审
          </Button>
          <Modal
            visible={visible}
            title="请输入评审结果"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                返回
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={this.handleOk}
                loading={this.props.saveAppraiseLoading}
              >
                提交
              </Button>,
            ]}
          >
            <Form>
              <FormItem>
                {getFieldDecorator('score', {
                  rules: [
                    {
                      required: true,
                      message: '请填写分数！',
                    },
                  ],
                })(
                  <InputNumber
                    min={0}
                    max={100}
                    placeholder="请输入分数(1-10)"
                    style={{ width: 150 }}
                  />,
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('suggestion', {
                  rules: [
                    {
                      required: true,
                      message: '请填写评审内容！',
                    },
                  ],
                })(<TextArea style={{ marginTop: '24px' }} placeholder="请输入评语" rows={4} />)}
              </FormItem>
            </Form>
          </Modal>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<AdvancedProps>()(Advanced);
