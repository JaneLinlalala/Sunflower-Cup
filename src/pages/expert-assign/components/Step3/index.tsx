import { Button } from 'antd';
import { Dispatch } from 'redux';
// eslint-disable-next-line sort-imports
import React, { Fragment } from 'react';
import { connect } from 'dva';
// eslint-disable-next-line sort-imports
import { StateType } from '../../model';
// eslint-disable-next-line sort-imports
import Result from '../Result';
import styles from './index.less';

interface Step3Props {
  data?: StateType['step'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch?: Dispatch<any>;
}

const Step3: React.FC<Step3Props> = props => {
  const { data } = props;
  if (!data) {
    return null;
  }
  const onFinish = () => {
    // TODO 返回到团委的首页
    // if (dispatch) {
    //   dispatch({
    //     type: 'formStepForm/saveCurrentStep',
    //     payload: 'info',
    //   });
    // }
  };
  const actions = (
    <Fragment>
      <Button type="primary" onClick={onFinish}>
        返回
      </Button>
    </Fragment>
  );
  return <Result type="success" title="操作成功" actions={actions} className={styles.result} />;
};

export default connect(({ formStepForm }: { formStepForm: StateType }) => ({
  data: formStepForm.step,
}))(Step3);
