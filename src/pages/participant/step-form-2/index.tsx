import { Card, Steps } from 'antd';
import React, { Component, Fragment } from 'react';

import { connect } from 'dva';
import { StateType } from './model';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import styles from './style.less';

const { Step } = Steps;

export interface StepFormProps {
  current: StateType['current'];
}

@connect(({ formStepForm }: { formStepForm: StateType }) => ({
  current: formStepForm.current,
}))
class StepForm extends Component<StepFormProps> {
  getCurrentStep() {
    const { current } = this.props;
    switch (current) {
      case 'info':
        return 0;
      case 'confirm':
        return 1;
      case 'result':
        return 2;
      default:
        return 0;
    }
  }

  render() {
    const currentStep = this.getCurrentStep();
    let stepComponent;
    if (currentStep === 1) {
      stepComponent = <Step2 />;
    } else if (currentStep === 2) {
      stepComponent = <Step3 />;
    } else {
      stepComponent = <Step1 />;
    }
    return (
      <Card bordered={false}>
        <Fragment>
          <Steps current={currentStep} className={styles.steps}>
            <Step title="填写填报信息" />
            <Step title="确认填报信息" />
            <Step title="保存填报信息" />
          </Steps>
          {stepComponent}
        </Fragment>
      </Card>
    );
  }
}

export default StepForm;