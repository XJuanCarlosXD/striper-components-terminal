import * as React from "react";

import Button from "../components/Button/Button.jsx";
import Icon from "../components/Icon/Icon.jsx";
import Group from "../components/Group/Group.jsx";
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

  state = {
    currency: "eur",
    products: [{ description: "", chargeAmount: 0, quantity: 1 }],
    taxAmount: 0,
  };

  handleAddProduct = () => {
    this.setState((prevState) => ({
      products: [
        ...prevState.products,
        { description: "", chargeAmount: 0, quantity: 1 },
      ],
    }));
  };

  handleRemoveProduct = (index) => {
    this.setState((prevState) => ({
      products: prevState.products.filter((_, i) => i !== index),
    }));
  };

  handleProductChange = (index, key, value) => {
    // Aseguramos que el valor siempre sea un número si es monto o cantidad
    const updatedProducts = [...this.state.products];
    updatedProducts[index][key] =
      key === "chargeAmount" || key === "quantity"
        ? parseFloat(value) || 0
        : value;
    this.setState({ products: updatedProducts });
  };

  handleTaxChange = (value) => {
    this.setState({ taxAmount: parseFloat(value) || 0 });
  };

  handleCurrencyChange = (value) => {
    this.setState({ currency: value });
  };

  render() {
    const { taxAmount } = this.state;
    const totalAmount =
      this.state.products.reduce((total, product) => {
        const productTotal = product.chargeAmount * product.quantity;
        return total + productTotal;
      }, 0) + this.state.taxAmount;

    return (
      <Group direction="column" spacing={0}>
        <Section position="first" laptopWidth="61.5%">
          <Text size={16} color="dark">
            Configuración del carrito
          </Text>
        </Section>
        <Section position="middle" laptopWidth="61.5%">
          <Group
            direction="row"
            alignment={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text size={12} color="dark">
              Moneda Global
            </Text>
            <Select
              items={CartForm.CURRENCIES}
              value={this.state.currency}
              onChange={(e) => this.handleCurrencyChange(e)}
              ariaLabel="Moneda Global"
            />
          </Group>
        </Section>
        <Section position="middle" laptopWidth="61.5%">
          {this.state.products.map((product, index) => (
            <Group key={index} direction="column" margin={20}>
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
                  value={product.description || ""}
                  onChange={(e) =>
                    this.handleProductChange(index, "description", e)
                  }
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
                  Monto
                </Text>
                <TextInput
                  value={product.chargeAmount || ""}
                  onChange={(e) =>
                    this.handleProductChange(index, "chargeAmount", e)
                  }
                  ariaLabel="Monto"
                  type="number"
                  min="0"
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
                  Cantidad
                </Text>
                <TextInput
                  value={product.quantity || 1}
                  onChange={(e) =>
                    this.handleProductChange(index, "quantity", e)
                  }
                  ariaLabel="Cantidad"
                  type="number"
                  min="1"
                />
              </Group>
              <Group
                direction="row"
                alignment={{ justifyContent: "flex-end", alignItems: "center" }}
              >
                <Button
                  type="primary"
                  onClick={() => this.handleRemoveProduct(index)}
                  justifyContent="center"
                >
                  <Icon icon="cancel" />
                  <Text color="darkGrey" size={14}>
                    Eliminar Producto
                  </Text>
                </Button>
              </Group>
            </Group>
          ))}
          <Group
            direction="row"
            margin={20}
            alignment={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text size={12} color="dark">
              Impuestos (Aplicar a todos los productos)
            </Text>
            <TextInput
              value={taxAmount || ""}
              onChange={(e) => this.handleTaxChange(e)}
              ariaLabel="Impuestos"
              type="number"
              min="0"
            />
          </Group>
          <Button
            color="white"
            onClick={this.handleAddProduct}
            justifyContent="left"
          >
            <Group direction="row">
              <Icon icon="payments" />
              <Text color="blue" size={14}>
                Agregar Producto
              </Text>
            </Group>
          </Button>
        </Section>
        <Section position="last" laptopWidth="61.5%">
          <Group
            direction="row"
            alignment={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text size={16} color="dark">
              Total: {totalAmount.toFixed(2)}{" "}
              {this.state.currency.toUpperCase()}
            </Text>
            <Button
              color="white"
              onClick={() => {
                const updateData = {
                  products: this.state.products,
                  taxAmount: this.state.taxAmount,
                  currency: this.state.currency,
                  totalAmount:
                    this.state.products.reduce((total, product) => {
                      const productTotal =
                        product.chargeAmount * product.quantity;
                      return total + productTotal;
                    }, 0) + this.state.taxAmount,
                };
                this.props.onClickUpdateLineItems(updateData);
              }}
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
      </Group>
    );
  }
}

export default CartForm;
