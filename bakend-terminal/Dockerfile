# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y package-lock.json (o yarn.lock) y luego instala las dependencias
COPY package*.json ./
RUN npm install

# Copia el resto de la aplicación al contenedor
COPY . .

# Expone el puerto que la aplicación usa
EXPOSE ${PORT:-4242}

# Comando por defecto para ejecutar la aplicación
CMD ["npm", "start"]
