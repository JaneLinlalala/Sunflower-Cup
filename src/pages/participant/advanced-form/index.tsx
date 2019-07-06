import {
  Button,
  Card,
  Col,
  Form,
  Icon,
  Input, message, Modal,
  Row,
  Select,
  Upload,
  Checkbox,
  Table, Input, Button, Form, Divider, Popconfirm,
} from 'antd';
import React, {Component, Fragment} from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import { isEqual } from 'lodash';
import TableForm, {TableFormDateType} from './components/TableForm';
import FooterToolbar from './components/FooterToolbar';
import token from '@/utils/token';
import currentUserId from "@/utils/currentUserId";
import {StateType} from "@/pages/participant/advanced-form/model";
import styles from "@/pages/participant/advanced-form/style.less";


const { TextArea } = Input;
const { Option } = Select;


const comType = ['科技发明制作', '调查报告和学术论文'];
const proType = [
  '机械与控制（包括机械、仪器仪表、自动化控制、工程、交通、建筑等）',
  '信息技术（包括计算机、电信、通讯、电子等）',
  '数理（包括数学、物理、地球与空间科学等）',
  '生命科学(包括生物､农学､药学､医学､健康､卫生､食品等)',
  '能源化工（包括能源、材料、石油、化学、化工、生态、环保等）',
  '哲学社会科学（包括哲学、经济、社会、法律、教育、管理）',
];

const options0 = [
  {value: '0', label: '实物、产品',},
  {value: '1', label: '模型',},
  {value: '2', label: '图纸',},
  {value: '3', label: '磁盘',},
  {value: '4', label: '现场演示',},
  {value: '5', label: '图片',},
  {value: '6', label: '录像',},
  {value: '7', label: '样品',},
];
const options1 = [
  {value: '0', label: '走访',},
  {value: '1', label: '问卷',},
  {value: '2', label: '现场采访',},
  {value: '3', label: '人员介绍',},
  {value: '4', label: '个别交谈',},
  {value: '5', label: '亲临实践',},
  {value: '6', label: '会议',},
  {value: '7', label: '图片、照片',},
  {value: '8', label: '书报刊物',},
  {value: '9', label: '统计报表',},
  {value: '10', label: '影视资料',},
  {value: '11', label: '文件',},
  {value: '12', label: '集体组织',},
  {value: '13', label: '自发',},
  {value: '14', label: '其它 ',},
];


const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
const curToken=token.get();

const props1= {
  name: 'file',
  action: 'http://180.76.233.101:8080/upload',
  headers: {
    cookies: curToken,
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onRemove(){

  },
};

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export interface AdvancedFormProps extends FormComponentProps {
  data:StateType;
  dispatch: Dispatch<any>;
  submitting: boolean;
}
@connect(({ FormType,loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  FormType,
  loading: loading.effects['FormType/fetchAdvanced'],
  data: FormType.data,
  submitting:loading.effects['FormType/submitAdvancedForm'],
}))

class AdvancedForm extends Component<{AdvancedFormProps: any, data:StateType, dispatch: Dispatch<any>} > {
  state = {
    width: '100%',
    previewVisible: false,
    begin:false,
    previewImage: '',
    fileList: [],
    competitionType:1,
  };

  componentDidMount() {
    const {dispatch,data} = this.props;
    dispatch({
      type: 'FormType/fetchAdvanced',
      payload: {
        id: this.props.location.state.id,
      },
    });
    window.addEventListener('resize', this.resizeFooterToolbar, {passive: true});
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleRemove=()=>{

  };

  // @ts-ignore
  handleChange = ({ fileList }) => this.setState({ fileList });

  // @ts-ignore
  handleType = (competitionType) => {this.setState({ competitionType});console.log(competitionType);};

  resizeFooterToolbar = () => {
    requestAnimationFrame(() => {
      const sider = document.querySelectorAll('.ant-layout-sider')[0] as HTMLDivElement;
      if (sider) {
        const width = `calc(100% - ${sider.style.width})`;
        const { width: stateWidth } = this.state;
        if (stateWidth !== width) {
          this.setState({ width });
        }
      }
    });
  };

  validate = () => {
    const {form: { validateFields }, dispatch,data} = this.props;
    // @ts-ignore
    validateFields((err, values) => {
      console.log(values);
      if (!err) {
        // submit the values
        dispatch({
          type: 'FormType/submitAdvancedForm',
          payload: {
            ...values,
            id: data.id,
            studentId: data.studentId,
            competitionType:data.typeone,
            projectType:data.typetwo,
          }
        });
      }
    });
  };


  render() {
    // @ts-ignore
    const { form, submitting, data} = this.props;
    const { width,previewVisible, previewImage, fileList ,competitionType} = this.state;
    const { getFieldDecorator, validateFields , getFieldValue } = form;
    if (!data) {
      return null;
    }

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    // @ts-ignore
    return (
      <>
      <Fragment>
        <Card>
          <Form.Item label='项目名称'>
            {getFieldDecorator('projectName', {
              initialValue: data.projectName,
              rules: [{ required: true, message: '请输入作品名称' }],
            })(<Input placeholder="请输入作品名称"  />)}
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="竞赛类别">
                {getFieldDecorator('competitionType', {
                  initialValue: comType[data.typeone],
                  rules: [{ required: true, message: '请选择竞赛类别' }],
                })(
                  <Select style={{ width: 300 }} onChange={(this.handleType).bind(this)}>
                    <Option value="0">科技发明制作</Option>
                    <Option value="1">调查报告和学术论文</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="学历">
                {getFieldDecorator('education', {
                  initialValue: data.education,
                  rules: [{ required: true, message: '请选择学历' }],
                })(
                  <Select style={{ width: 300 }}>
                    <Option value="大专">大专</Option>
                    <Option value="大学本科">大学本科</Option>
                    <Option value="硕士研究生">硕士研究生</Option>
                    <Option value="博士研究生">博士研究生</Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="院系">
                {getFieldDecorator('college', {
                  initialValue: data.college,
                  rules: [{ required: true, message: '请输入院系名称' }],
                })(<Input placeholder="请输入院系名称" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="申报人姓名">
                {getFieldDecorator('studentName', {
                  initialValue: data.studentName,
                  rules: [{ required: true, message: '请输入申报人姓名' }],
                })(<Input placeholder="请输入申报人姓名" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="申报人学号">
                {getFieldDecorator('studentNumber', {
                  initialValue: data.studentNumber,
                  rules: [{ required: true, message: '请输入申报人学号' }],
                })(<Input placeholder="请输入申报人学号" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="出生年月">
                {getFieldDecorator('birthDay',{
                  initialValue:data.birthDay,
                  rules: [{ required: true, message: '请选择出生年月' }]} )
                (<Input  placeholder="YYYY-MM"/>)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="专业">
                {getFieldDecorator('major', {
                  initialValue: data.major,
                  rules: [{ required: true, message: '请输入申报人专业' }],
                })(<Input placeholder="请输入申报人专业" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="入学年份">
                {getFieldDecorator('entryYear', {
                  initialValue: data.entryYear,
                  rules: [{ required: true, message: '请输入入学年份 ' }],
                })(<Input placeholder="请输入入学年份" />)}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="作品全称">
            {getFieldDecorator('projectFullName', {
              initialValue: data.projectFullName,
              rules: [{ required: true, message: '请输入作品全称' }],
            })(<Input placeholder="请输入作品全称" />)}
          </Form.Item>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="通讯地址">
                {getFieldDecorator('address', {
                  initialValue: data.address,
                  rules: [{ required: true, message: '请输入通讯地址' }],
                })(<Input placeholder="请输入通讯地址" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="联系方式">
                {getFieldDecorator('phone', {
                  initialValue: data.phone,
                  rules: [{ required: true, message: '请输入联系方式' }],
                })(<Input placeholder="请输入联系方式" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="邮箱">
                {getFieldDecorator('email', {
                  initialValue: data.email,
                  rules:
                    [{ required: true, message: '请输入邮箱' },
                    {type:'email', message: '输入格式错误!'}],
                })(<Input placeholder="请输入邮箱" />)}
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="合作者情况" bordered={false}>
          {getFieldDecorator('friends',{
            initialValue: data.friends === null?"":JSON.parse(data.friends),
          })(<TableForm/>)}
        </Card>
        <Card>
        <Form.Item {...formItemLayout} label="作品分类">
          {getFieldDecorator('projectType', {
            initialValue: proType[data.typetwo],
            rules: [{ required: true, message: '请选择作品分类' }],
          })(
            <Select style={{ width: 500 }} >
              <Option value="0">
                机械与控制（包括机械、仪器仪表、自动化控 制、工程、交通、建筑等）
              </Option>
              <Option value="1">信息技术（包括计算机、电信、通讯、电子等）</Option>
              <Option value="2">数理（包括数学、物理、地球与空间科学等）</Option>
              <Option value="3">生命科学(包括生物､农学､药学､医学､健 康､卫生､食品等)</Option>
              <Option value="4">能源化工（包括能源、材料、石油、化学、化 工、生态、环保等）</Option>
              <Option value="5">哲学社会科学（包括哲学、经济、社会、法律、教育、管理）</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="作品总体情况说明">
          {getFieldDecorator('details', {
            initialValue: data.details,
            rules: [{ required: true, message: '请输入作品情况说明' }],
          })(<TextArea placeholder="请输入作品情况说明" autosize={{ minRows: 2, maxRows: 6 }} />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="作品创新点">
          {getFieldDecorator('invention', {
            initialValue: data.invention,
            rules: [{ required: true, message: '请输入作品创新点' }],
          })(<TextArea placeholder="请输入作品创新点" autosize={{ minRows: 2, maxRows: 6 }} />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="关键词">
          {getFieldDecorator('keywords', {
            initialValue: data.keywords,
            rules: [{ required: true, message: '请输入关键词' }],
          })(<TextArea placeholder="请输入关键词" autosize={{ minRows: 2, maxRows: 6 }} />)}
        </Form.Item>
          <Form.Item {...formItemLayout} label="作品可展示形式">
            {getFieldDecorator('additionalMessage', {
              initialValue: data.additionalMessage,
              rules: [{ required: true, message: '请输入关键词' }],
            })
            (<Checkbox.Group options={options0} disabled={this.state.competitionType !=='0'} defaultValue={data.additionalMessage}/>)}
          </Form.Item>
          <Form.Item {...formItemLayout} label="作品调查方式">
            {getFieldDecorator('additionalMessage', {
              initialValue: data.additionalMessage,
              rules: [{ required: true, message: '请输入关键词' }],
            })
            (<Checkbox.Group options={options1} disabled={this.state.competitionType === '0'} defaultValue={data.additionalMessage}/>)}
          </Form.Item>
        <Form.Item {...formItemLayout} label="上传文件(.pdf)">
          <Upload {...props1} accept=".pdf"  withCredentials={true}
                  data={file => ({ // data里存放的是接口的请求参数
                    id:data.id,
                  })}
                  onPreview={this.handlePreview}>
            <Button>
              <Icon type="upload" /> 点击上传文件（PDF）
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item {...formItemLayout} label="上传视频(.mp4)">
          <Upload {...props1} accept=".mp4" withCredentials={true}
                  data={file => ({ // data里存放的是接口的请求参数
                    id:data.id,})}>
            <Button>
              <Icon type="upload" /> 点击上传视频
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item {...formItemLayout} label="上传图片(.PNG)少于五张">
          <Upload
            action="http://180.76.233.101:8080/upload"
            listType="picture-card"
            accept=".png"
            withCredentials={true}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            headers={{cookies:curToken}}
            data={file => ({ // data里存放的是接口的请求参数
              id:data.id,})}
          >
            {fileList.length >= 5 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Form.Item>
        </Card>
      </Fragment>
        <FooterToolbar style={{ width }}>
          <Button type="primary" onClick={this.validate} loading={submitting}>
            保存
          </Button>
        </FooterToolbar>
        </>
    );
  }
}

export default Form.create<AdvancedFormProps>()(AdvancedForm);
