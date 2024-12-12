import * as React from "react";

import Button from "../components/Button/Button.jsx";
import Icon from "../components/Icon/Icon.jsx";
import Group from "../components/Group/Group.jsx";
import Link from "../components/Link/Link.jsx";
import Section from "../components/Section/Section.jsx";
import Text from "../components/Text/Text.jsx";
import TextInput from "../components/TextInput/TextInput.jsx";
import Select from "../components/Select/Select.jsx";

class CartForm extends React.Component {
  static CURRENCIES = [
    { value: "eur", label: "EUR" },
    { value: "usd", label: "USD" },
    { value: "aud", label: "AUD" },
    { value: "cad", label: "CAD" },
    { value: "czk", label: "CZK" },

    { value: "gbp", label: "GBP" },
    { value: "nzd", label: "NZD" },
    { value: "sgd", label: "SGD" },

    { value: "dkk", label: "DKK" },
    { value: "sek", label: "SEK" },
  ];

  render() {
    return (
      <>
        <Group direction="column" spacing={0}>
          <Section position="first">
            <Text size={16} color="dark">
              Configuración del carrito
            </Text>
          </Section>
          <Section position="middle">
            <Group direction="column">
              <Group
                direction="row"
                alignment={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text size={12} color="dark">
                  Descripción del artículo
                </Text>
                <TextInput
                  value={this.props.itemDescription}
                  onChange={this.props.onChangeItemDescription}
                  ariaLabel="Descripción del artículo"
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
                  Monto de cargo
                </Text>
                <TextInput
                  value={this.props.chargeAmount}
                  onChange={this.props.onChangeChargeAmount}
                  ariaLabel="Monto de cargo"
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
                  Monto de impuestos
                </Text>
                <TextInput
                  value={this.props.taxAmount}
                  onChange={this.props.onChangeTaxAmount}
                  ariaLabel="Monto de impuestos"
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
                  Moneda
                </Text>
                <Select
                  items={CartForm.CURRENCIES}
                  value={CartForm.CURRENCIES[0]}
                  onChange={this.props.onChangeCurrency}
                  ariaLabel="Moneda"
                />
              </Group>
              <Button
                color="white"
                onClick={this.props.onClickUpdateLineItems}
                disabled={this.props.workFlowDisabled}
                justifyContent="left"
              >
                <Group direction="row">
                  <Icon icon="list" />
                  <Text color="blue" size={14}>
                    Actualizar los artículos y totales
                  </Text>
                </Group>
              </Button>
            </Group>
          </Section>
          <Section position="last">
            <Text size={12} color="lightGrey">
              Probar respuestas de pago{" "}
              <Link
                href="https://stripe.com/docs/terminal/testing"
                text="usando montos"
                newWindow
              />
              .
            </Text>
          </Section>
        </Group>
      </>
    );
  }
}

export default CartForm;
