//@flow

import * as React from "react";

import Button from "../components/Button/Button.jsx";
import Group from "../components/Group/Group.jsx";
import Icon from "../components/Icon/Icon.jsx";
import Section from "../components/Section/Section.jsx";
import Text from "../components/Text/Text.jsx";
import TestPaymentMethods from "./TestPaymentMethods.jsx";

class CommonWorkflows extends React.Component {
  render() {
    const {
      onClickCancelPayment,
      onChangeTestCardNumber,
      onChangeTipAmount,
      onChangeSimulateOnReaderTip,
      onChangeTestPaymentMethod,
      cancelablePayment,
      workFlowDisabled,
      usingSimulator,
    } = this.props;
    return (
      <Section>
        <Group direction="column" spacing={16}>
          <Text size={16} color="dark">
            Flujos de trabajo comunes
          </Text>
          <Group direction="column" spacing={8}>
            {usingSimulator && (
              <TestPaymentMethods
                onChangeTestCardNumber={onChangeTestCardNumber}
                onChangeTipAmount={onChangeTipAmount}
                onChangeSimulateOnReaderTip={onChangeSimulateOnReaderTip}
                onChangeTestPaymentMethod={onChangeTestPaymentMethod}
              />
            )}
            <Button
              color="white"
              onClick={this.props.onClickCollectCardPayments}
              disabled={workFlowDisabled}
              justifyContent="left"
            >
              <Group direction="row">
                <Icon icon="payments" />
                <Text color="blue" size={14}>
                  Recoger pago con tarjeta
                </Text>
              </Group>
            </Button>
            <Button
              color="white"
              onClick={this.props.onClickSaveCardForFutureUse}
              disabled={workFlowDisabled}
              justifyContent="left"
            >
              <Group direction="row">
                <Icon icon="card" />
                <Text color="blue" size={14}>
                  Guardar tarjeta para uso futuro
                </Text>
              </Group>
            </Button>
            <Button
              color="white"
              onClick={onClickCancelPayment}
              disabled={!cancelablePayment}
              justifyContent="left"
            >
              <Group direction="row">
                <Icon icon="cancel" />
                <Text color="blue" size={14}>
                  Cancelar pago
                </Text>
              </Group>
            </Button>
          </Group>
        </Group>
      </Section>
    );
  }
}

export default CommonWorkflows;
