//@flow

import * as React from "react";

import Button from "../components/Button/Button.jsx";
import Group from "../components/Group/Group.jsx";
import Section from "../components/Section/Section.jsx";
import Text from "../components/Text/Text.jsx";
import TextInput from "../components/TextInput/TextInput.jsx";
import Select from "../components/Select/Select.jsx";
import Link from "../components/Link/Link.jsx";

class RegisterNewReader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: [],
      readerCode: null,
      readerLabel: null,
      readerLocationId: null,
    };
  }

  componentDidMount() {
    this.props.listLocations().then((locations) => {
      this.setState({
        locations,
        readerLocationId: locations.length >= 1 ? locations[0].id : null,
      });
    });
  }

  onChangeReaderCode = (str) => {
    this.setState({ readerCode: str });
  };

  onChangeReaderLabel = (str) => {
    this.setState({ readerLabel: str });
  };

  onChangeReaderLocationId = (str) => {
    this.setState({ readerLocationId: str });
  };

  onSubmitRegister = (event) => {
    event.preventDefault();
    const { readerCode, readerLabel, readerLocationId } = this.state;
    this.props.onSubmitRegister(readerLabel, readerCode, readerLocationId);
  };

  render() {
    const { readerCode, readerLabel, locations, readerLocationId } = this.state;
    const { onClickCancel } = this.props;
    return (
      <Section>
        <form onSubmit={this.onSubmitRegister}>
          <Group direction="column" spacing={16}>
            <Group direction="column" spacing={8}>
              <Text size={16} color="dark">
                Registrar nuevo lector
              </Text>
              <Text size={12} color="lightGrey">
                Ingresa la secuencia de teclas 0-7-1-3-9 en el lector para
                mostrar su código de registro único.
              </Text>
            </Group>
            <Group direction="column" spacing={8}>
              <Text size={14} color="darkGrey">
                Código de registro
              </Text>
              <TextInput
                placeholder="quick-brown-fox"
                value={readerCode}
                onChange={this.onChangeReaderCode}
                ariaLabel="Código de registro"
              />
              <Text size={14} color="darkGrey">
                Etiqueta del lector
              </Text>
              <TextInput
                placeholder="Recepción"
                value={readerLabel}
                onChange={this.onChangeReaderLabel}
                ariaLabel="Etiqueta del lector"
              />
              <Text size={14} color="darkGrey">
                Ubicación del lector
              </Text>
              {locations.length === 0 ? (
                <Text size={12} color="lightGrey">
                  Parece que aún no tienes ubicaciones. Comienza creando una en{" "}
                  <Link
                    size={12}
                    href="https://dashboard.stripe.com/terminal/locations"
                    text="el panel"
                  />
                  .
                </Text>
              ) : (
                <Group direction="column" spacing={1}>
                  <Select
                    items={locations.map((location) => ({
                      value: location.id,
                      label: `${location.display_name} (${location.id})`,
                    }))}
                    value={readerLocationId}
                    onChange={this.onChangeReaderLocationId}
                    ariaLabel="Ubicación del lector"
                    required
                  />
                  <Text size={10} color="lightGrey">
                    Puedes crear más ubicaciones en{" "}
                    <Link
                      size={10}
                      href="https://dashboard.stripe.com/terminal/locations"
                      text="el panel"
                    />
                    .
                  </Text>
                </Group>
              )}
            </Group>
            <Group direction="row" alignment={{ justifyContent: "flex-end" }}>
              <Button color="white" onClick={onClickCancel}>
                <Text color="darkGrey" size={14}>
                  Cancelar
                </Text>
              </Button>
              <Button
                type="submit"
                disabled={
                  readerCode === null ||
                  readerCode === "" ||
                  readerLabel === null ||
                  readerLabel === ""
                }
                color="primary"
              >
                <Text color="white" size={14}>
                  Registrar
                </Text>
              </Button>
            </Group>
          </Group>
        </form>
      </Section>
    );
  }
}

export default RegisterNewReader;
