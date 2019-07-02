import { Button } from 'antd';
import React, { Fragment } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { StateType } from '../../model';
import Result from '../Result';
import styles from './index.less';

interface Step3Props {
  data?: StateType['step'];
  dispatch?: Dispatch<any>;
}

const Step3: React.FC<Step3Props> = props => {
  const { data, dispatch } = props;
  if (!data) {
    return null;
  }
  const onFinish = () => {
    if (dispatch) {
      dispatch({
        type: 'formStepForm/saveCurrentStep',
        payload: 'info',
      });
    }
  };

  const actions = (
    <Fragment>
      <Button type="primary" onClick={onFinish}>
        再申报一个项目
      </Button>
      <Button>查看项目</Button>
    </Fragment>
  );
  return <Result type="success" title="操作成功" actions={actions} className={styles.result} />;
};

export default connect(({ formStepForm }: { formStepForm: StateType }) => ({
  data: formStepForm.step,
}))(Step3);
