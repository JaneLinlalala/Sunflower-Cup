import { Alert, Button, Divider, Form } from 'antd';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { connect } from 'dva';
import { StateType } from '../../model';
import styles from './index.less';
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};
interface Step2Props extends FormComponentProps {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
  submitting?: boolean;
}
const comType = ['科技发明制作', '调查报告和学术论文'];
const proType = [
  '机械与控制（包括机械、仪器仪表、自动化控制、工程、交通、建筑等）',
  '信息技术（包括计算机、电信、通讯、电子等）',
  '数理（包括数学、物理、地球与空间科学等）',
  '生命科学(包括生物､农学､药学､医学､健康､卫生､食品等)',
  '能源化工（包括能源、材料、石油、化学、化工、生态、环保等）',
  '哲学社会科学（包括哲学、经济、社会、法律、教育、管理）',
];

const Step2: React.FC<Step2Props> = props => {
  const { form, data, dispatch, submitting } = props;
  if (!data) {
    return null;
  }
  const { validateFields } = form;
  const onPrev = () => {
    if (dispatch) {
      dispatch({
        type: 'formStepForm/saveCurrentStep',
        payload: 'info',
      });
    }
  };
  const onValidateForm = (e: React.FormEvent) => {
    const { dispatch} = props;
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        if (dispatch) {
          dispatch({
            type: 'formStepForm/submitStepForm',
            payload: {
              ...data,
              ...values,
              id: data.id,
            },
          });
        }
      }
    });
    console.log(data.id);
  };
  // @ts-ignore
  return (
    <Form layout="horizontal" className={styles.stepForm}>
      <Alert closable showIcon message="确认填报信息后可进行保存。" style={{ marginBottom: 24 }} />
      <Form.Item {...formItemLayout} className={styles.stepFormText} label="作品名称">
        {data.projectName}
      </Form.Item>
      <Form.Item {...formItemLayout} className={styles.stepFormText} label="院系">
        {data.college}
      </Form.Item>
      <Form.Item {...formItemLayout} className={styles.stepFormText} label="竞赛类别">
        {comType[data.competitionType]}
      </Form.Item>
      <Form.Item {...formItemLayout} className={styles.stepFormText} label="申报人姓名">
        {data.studentName}
      </Form.Item>
      <Form.Item {...formItemLayout} className={styles.stepFormText} label="申报人学号">
        {data.studentNumber}
      </Form.Item>
      <Form.Item {...formItemLayout} className={styles.stepFormText} label="出生年月">
        {data.birthDay}
      </Form.Item>
      <Form.Item {...formItemLayout} className={styles.stepFormText} label="最高学历">
        {data.education}
      </Form.Item>
      <Form.Item {...formItemLayout} className={styles.stepFormText} label="专业">
        {data.major}
      </Form.Item>
      <Form.Item {...formItemLayout} className={styles.stepFormText} label="入学年份">
        {data.entryYear}
      </Form.Item>
      <Form.Item {...formItemLayout} className={styles.stepFormText} label="作品全称">
        {data.projectFullName}
      </Form.Item>
      <Form.Item {...formItemLayout} className={styles.stepFormText} label="通讯地址">
        {data.address}
      </Form.Item>
      <Form.Item {...formItemLayout} className={styles.stepFormText} label="联系方式">
        {data.phone}
      </Form.Item>
      <Form.Item {...formItemLayout} className={styles.stepFormText} label="邮箱">
        {data.email}
      </Form.Item>
      <Form.Item {...formItemLayout} className={styles.stepFormText} label="作品分类">
        {proType[data.projectType]}
      </Form.Item>
      <Form.Item {...formItemLayout} className={styles.stepFormText} label="作品总体情况">
        {data.details}
      </Form.Item>
      <Form.Item {...formItemLayout} className={styles.stepFormText} label="作品创新点">
        {data.invention}
      </Form.Item>
      <Form.Item {...formItemLayout} className={styles.stepFormText} label="关键词">
        {data.keywords}
      </Form.Item>

      <Divider style={{ margin: '24px 0' }} />
      <Form.Item
        style={{ marginBottom: 8 }}
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: {
            span: formItemLayout.wrapperCol.span,
            offset: formItemLayout.labelCol.span,
          },
        }}
        label=""
      >
        <Button type="primary" onClick={onValidateForm} loading={submitting}>
          保存
        </Button>
        <Button onClick={onPrev} style={{ marginLeft: 8 }}>
          上一步
        </Button>
      </Form.Item>
    </Form>
  );
};
export default connect(
  ({
    formStepForm,
    loading,
  }: {
    formStepForm: StateType;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    submitting: loading.effects['formStepForm/submitStepForm'],
    data: formStepForm.step,
  }),
)(Form.create<Step2Props>()(Step2));
