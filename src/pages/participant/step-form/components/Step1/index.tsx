import { Button, Card, Col, Form, Icon, Input, Row, Select, Upload, message } from 'antd';
import React, { Fragment } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
// eslint-disable-next-line sort-imports
import { StateType } from '../../model';
import TableForm from './TableForm';
// eslint-disable-next-line sort-imports
import PicturesWall from './imgUpLoad';

const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
interface Step1Props extends FormComponentProps {
  data?: StateType['step'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch?: Dispatch<any>;
}

const props1 = {
  name: 'file',
  action: 'http://liuterry.cn:8080/upload',
  headers: {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange(info: { file: { status: string; name: any }; fileList: any }) {
    if (info.file.status !== 'uploading') {
      // eslint-disable-next-line no-console
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const props2 = {
  name: 'video',
  action: 'http://liuterry.cn:8080/upload',
  headers: {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange(info: { file: { status: string; name: any }; fileList: any }) {
    if (info.file.status !== 'uploading') {
      // eslint-disable-next-line no-console
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const Step1: React.FC<Step1Props> = props => {
  const { form, dispatch, data } = props;
  if (!data) {
    return null;
  }
  const { getFieldDecorator, validateFields } = form;
  const onValidateForm = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validateFields((err: any, values: StateType['step']) => {
      if (!err && dispatch) {
        dispatch({
          type: 'formStepForm/saveStepFormData',
          payload: values,
        });
        dispatch({
          type: 'formStepForm/saveCurrentStep',
          payload: 'confirm',
        });
      }
    });
  };
  // @ts-ignore
  return (
    <Fragment>
      <Card>
        <Form.Item label="作品名称">
          {getFieldDecorator('projectName', {
            initialValue: data.projectName,
            rules: [{ required: true, message: '请输入作品名称' }],
          })(<Input placeholder="请输入作品名称" />)}
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="竞赛类别">
              {getFieldDecorator('competitionType', {
                initialValue: data.competitionType,
                rules: [{ required: true, message: '请选择竞赛类别' }],
              })(
                <Select style={{ width: 300 }}>
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
            <Form.Item label="出生年月（xxx年-xx月)">
              {getFieldDecorator('birthDay', {
                initialValue: data.birthDay,
                rules: [{ required: true, message: '请输入出生年月' }],
              })(<Input placeholder="请输入出生年月" />)}
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
                rules: [{ required: true, message: '请输入邮箱' }],
              })(<Input placeholder="请输入邮箱" />)}
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card title="合作者情况" bordered={false}>
        {getFieldDecorator('friends', {
          initialValue: data.friends,
        })(<TableForm />)}
      </Card>
      <Form.Item {...formItemLayout} label="作品分类">
        {getFieldDecorator('projectType', {
          initialValue: data.projectType,
          rules: [{ required: true, message: '请选择作品分类' }],
        })(
          <Select style={{ width: 500 }}>
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
      <Form.Item {...formItemLayout} label="上传文件">
        <Upload {...props1} accept=".pdf" fileList={[]} withCredentials>
          <Button>
            <Icon type="upload" /> 点击上传文件（PDF）
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item {...formItemLayout} label="上传视频">
        <Upload {...props2} accept="video/mp4" fileList={[]} withCredentials>
          <Button>
            <Icon type="upload" /> 点击上传视频
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item {...formItemLayout} label="上传图片">
        <PicturesWall />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: {
            span: formItemLayout.wrapperCol.span,
            offset: formItemLayout.labelCol.span,
          },
        }}
        label=""
      >
        <Button type="primary" onClick={onValidateForm}>
          下一步
        </Button>
      </Form.Item>
    </Fragment>
  );
};

export default connect(({ formStepForm }: { formStepForm: StateType }) => ({
  data: formStepForm.step,
}))(Form.create<Step1Props>()(Step1));
