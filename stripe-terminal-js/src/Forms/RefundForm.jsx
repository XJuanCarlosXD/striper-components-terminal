import * as React from "react";

import Button from "../components/Button/Button.jsx";
import Icon from "../components/Icon/Icon.jsx";
import Group from "../components/Group/Group.jsx";
import Section from "../components/Section/Section.jsx";
import Text from "../components/Text/Text.jsx";
import TextInput from "../components/TextInput/TextInput.jsx";

class RefundForm extends React.Component {
  render() {
    return (
      <>
        <Group direction="column" spacing={0}>
          <Section position="first">
            <Text size={16} color="dark">
              Reembolso con tarjeta presente
            </Text>
          </Section>
          <Section position="last">
            <Group direction="column">
              <Group
                direction="row"
                alignment={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text size={12} color="dark">
                  ID de cargo
                </Text>
                <TextInput
                  value={this.props.chargeID}
                  onChange={this.props.onChangeChargeID}
                />
              </Group>
              <Group
                direction="row"
                alignment={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text size={12} color="dark">
                  Monto del reembolso
                </Text>
                <TextInput
                  value={this.props.refundAmount}
                  onChange={this.props.onChangeRefundAmount}
                />
              </Group>
              <Button
                color="white"
                onClick={this.props.onClickProcessRefund}
                disabled={this.props.cancelableRefund}
                justifyContent="left"
              >
                <Group direction="row">
                  <Icon icon="list" />
                  <Text color="blue" size={14}>
                    Procesar reembolso
                  </Text>
                </Group>
              </Button>
              <Button
                color="white"
                onClick={this.props.onClickCancelRefund}
                disabled={!this.props.cancelableRefund}
                justifyContent="left"
              >
                <Group direction="row">
                  <Icon icon="cancel" />
                  <Text color="blue" size={14}>
                    Cancelar reembolso
                  </Text>
                </Group>
              </Button>
            </Group>
          </Section>
        </Group>
      </>
    );
  }
}

export default RefundForm;
