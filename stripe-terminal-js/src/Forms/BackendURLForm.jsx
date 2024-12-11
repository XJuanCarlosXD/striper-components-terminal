import * as React from "react";

import Button from "../components/Button/Button.jsx";
import Group from "../components/Group/Group.jsx";
import Link from "../components/Link/Link.jsx";
import Section from "../components/Section/Section.jsx";
import Text from "../components/Text/Text.jsx";
import TextInput from "../components/TextInput/TextInput.jsx";

class BackendURLForm extends React.Component {
  constructor(props) {
    super(props);

    let localstorageUrlCache = window.localStorage.getItem(
      "terminal.backendUrl"
    );

    this.state = {
      backendURL: localstorageUrlCache ? localstorageUrlCache : "",
    };
  }

  onFormInitialize = (event) => {
    event.preventDefault();
    this.props.onSetBackendURL(this.state.backendURL.trim());
  };

  onChangeBackendURL = (str) => {
    this.setState({ backendURL: str });
  };

  render() {
    const { backendURL } = this.state;
    return (
      <Section>
        <form onSubmit={this.onFormInitialize}>
          <Group direction="column" spacing={18}>
            <Text size={16} color="dark">
              Conectar al servidor backend
            </Text>

            <Group direction="column">
              <TextInput
                placeholder="https://tuservidor.herokuapp.com"
                value={backendURL}
                ariaLabel="URL del backend"
                onChange={this.onChangeBackendURL}
              />

              <Group
                direction="row"
                alignment={{ justifyContent: "space-between" }}
              >
                <Text size={12} color="lightGrey">
                  Configura e implementa{" "}
                  <Link
                    href="https://github.com/stripe/example-terminal-backend"
                    text="el backend de ejemplo"
                    newWindow
                  />
                  , luego completa la URL.
                </Text>
                <Button
                  disabled={backendURL === "" || backendURL === null}
                  color="primary"
                  type="submit"
                >
                  <Text color="white" size={14}>
                    Conectar
                  </Text>
                </Button>
              </Group>
            </Group>
          </Group>
        </form>
      </Section>
    );
  }
}

export default BackendURLForm;
