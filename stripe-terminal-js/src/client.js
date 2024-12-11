class Client {
  constructor(url) {
    this.url = url;
    this.createConnectionToken = this.createConnectionToken.bind(this);
    this.registerDevice = this.registerDevice.bind(this);
    this.createPaymentIntent = this.createPaymentIntent.bind(this);
    this.capturePaymentIntent = this.capturePaymentIntent.bind(this);
    this.cancelPaymentIntent = this.cancelPaymentIntent.bind(this);
    this.verifyTerminalConnection = this.verifyTerminalConnection.bind(this);
    this.disconnectTerminal = this.disconnectTerminal.bind(this);
  }

  // Crear un token de conexión para el terminal
  createConnectionToken() {
    const formData = new URLSearchParams();
    return this.doPost(this.url + "/connection_token", formData);
  }

  // Registrar un dispositivo de terminal (lector)
  registerDevice({ label, registrationCode, location }) {
    const formData = new URLSearchParams();
    formData.append("label", label);
    formData.append("registration_code", registrationCode);
    formData.append("location", "tml_F06gagVm1WuNw6");
    return this.doPost(this.url + "/register_reader", formData);
  }

  // Crear una PaymentIntent para un pago
  createPaymentIntent({ amount, currency, description, paymentMethodTypes }) {
    const formData = new URLSearchParams();
    formData.append("amount", amount);
    formData.append("currency", currency);
    formData.append("description", description);
    paymentMethodTypes.forEach((type) => formData.append(`payment_method_types[]`, type));
    return this.doPost(this.url + "/create_payment_intent", formData);
  }

  // Capturar el pago de una PaymentIntent
  capturePaymentIntent({ paymentIntentId }) {
    const formData = new URLSearchParams();
    formData.append("payment_intent_id", paymentIntentId);
    return this.doPost(this.url + "/capture_payment_intent", formData);
  }

  // Cancelar una PaymentIntent
  cancelPaymentIntent({ paymentIntentId }) {
    const formData = new URLSearchParams();
    formData.append("payment_intent_id", paymentIntentId);
    return this.doPost(this.url + "/cancel_payment_intent", formData);
  }

  // Verificar la conexión del terminal
  verifyTerminalConnection({ readerId }) {
    const formData = new URLSearchParams();
    formData.append("reader_id", readerId);
    return this.doPost(this.url + "/verify_terminal_connection", formData);
  }

  // Desconectar el terminal
  disconnectTerminal({ readerId }) {
    const formData = new URLSearchParams();
    formData.append("reader_id", readerId);
    return this.doPost(this.url + "/disconnect_terminal", formData);
  }

  // Método para obtener una lista de ubicaciones
  async listLocations() {
    const response = await fetch(this.url + "/list_locations", {
      method: "get",
    });

    if (response.ok) {
      return response.json();
    } else {
      let text = await response.text();
      throw new Error("Request Failed: " + text);
    }
  }

  // Método genérico para hacer peticiones POST
  async doPost(url, body) {
    let response = await fetch(url, {
      method: "post",
      body: body,
    });

    if (response.ok) {
      return response.json();
    } else {
      let text = await response.text();
      throw new Error("Request Failed: " + text);
    }
  }
}

export default Client;
