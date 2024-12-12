const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const winston = require("winston");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Winston para loguear en archivo
const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: "logs/app.log", level: "info" }),
  ],
});

// Usar morgan para registrar las solicitudes HTTP (en consola)
app.use(morgan("combined", { stream: { write: (msg) => logger.info(msg) } }));

// Middleware para loguear la entrada y salida de cada endpoint
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}`);
  res.on("finish", () => {
    logger.info(`Response sent: ${res.statusCode} - Body: ${JSON.stringify(res.body)}`);
  });
  next();
});


app.post("/register_reader", async (req, res) => {
  try {
    const { registration_code, label, location } = req.body;

    if (!registration_code) {
      return res.status(400).json({ error: "El código de registro es obligatorio." });
    }

    let locationId = location;

    // Si no se proporciona una ubicación, crea una predeterminada
    if (!locationId) {
      const newLocation = await stripe.terminal.locations.create({
        display_name: "Ubicación Predeterminada",
        address: {
          line1: "123 Calle Principal",
          city: "Ciudad",
          state: "Estado",
          country: "MX",
          postal_code: "12345",
        },
      });
      locationId = newLocation.id;
    }

    // Crear el lector con la ubicación especificada
    const reader = await stripe.terminal.readers.create({
      registration_code,
      label: label || "Default Reader",
      location: "tml_F06gagVm1WuNw6",
    });

    logger.info(`Reader registered successfully with ID: ${reader.id}`);
    res.json(reader);
  } catch (error) {
    logger.error("Error registrando el terminal: " + error.message);
    res.status(500).json({ error: error.message });
  }
});


// Endpoint para listar todas las ubicaciones de terminal
app.get("/list_locations", async (req, res) => {
  try {
    const locations = await stripe.terminal.locations.list({
      limit: 100,
    });

    logger.info(`Retrieved ${locations.data.length} locations.`);
    res.json(locations.data);
  } catch (error) {
    logger.error("Error retrieving locations: " + error.message);
    res.status(500).json({ error: error.message });
  }
});




// Crear un token de conexión para el terminal
app.post("/connection_token", async (req, res) => {
  try {
    let connectionToken = await stripe.terminal.connectionTokens.create();
    logger.info("Connection token created successfully.");
    res.json({ secret: connectionToken.secret });
  } catch (error) {
    logger.error("Error creando el connection_token: " + error.message);
    res.status(500).json({ error: error.message });
  }
});

// Crear una PaymentIntent para el pago
app.post("/create_payment_intent", async (req, res) => {
  const { amount, currency, description } = req.body
  try {
    const intent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: currency,
      payment_method_types: ["card_present"],
      capture_method: "automatic",
    });

    logger.info(`PaymentIntent created with ID: ${intent.id}`);
    res.json({
      ...intent,
      secret: intent.client_secret,
      paymentIntentId: intent.id,
    });
  } catch (error) {
    logger.error("Error creando PaymentIntent: " + error.message);
    res.status(500).json({ error: error.message });
  }
});

// Capturar el pago una vez que ha sido autorizado por el terminal
app.post("/capture_payment_intent", async (req, res) => {
  try {
    const intent = await stripe.paymentIntents.capture(req.body.payment_intent_id);
    logger.info(`PaymentIntent captured with ID: ${intent.id}`);
    res.json(intent);
  } catch (error) {
    logger.error("Error capturando el PaymentIntent: " + error.message);
    res.status(500).json({ error: error.message });
  }
});

// Cancelar una PaymentIntent si el pago no ha sido capturado
app.post("/cancel_payment_intent", async (req, res) => {
  try {
    const intent = await stripe.paymentIntents.cancel(req.body.payment_intent_id);
    logger.info(`PaymentIntent canceled with ID: ${intent.id}`);
    res.json(intent);
  } catch (error) {
    logger.error("Error cancelando el PaymentIntent: " + error.message);
    res.status(500).json({ error: error.message });
  }
});

// Desconectar el terminal
app.post("/disconnect_terminal", async (req, res) => {
  try {
    const terminal = await stripe.terminal.readers.disconnect(req.body.reader_id);
    logger.info(`Terminal disconnected with ID: ${req.body.reader_id}`);
    res.json(terminal);
  } catch (error) {
    logger.error("Error desconectando el terminal: " + error.message);
    res.status(500).json({ error: error.message });
  }
});

// Método para verificar la conexión de un terminal
app.post("/verify_terminal_connection", async (req, res) => {
  try {
    const reader = await stripe.terminal.readers.retrieve(req.body.reader_id);
    logger.info(`Terminal connection verified for reader ID: ${req.body.reader_id}`);
    res.json(reader);
  } catch (error) {
    logger.error("Error verificando la conexión del terminal: " + error.message);
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor Express
const port = process.env.PORT || 4242;
app.listen(port, () => {
  logger.info('Node server listening on port 4242!');
});
