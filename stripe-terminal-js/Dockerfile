# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código fuente
COPY . .

# Expone el puerto 3000 (o el puerto configurado en tu aplicación React)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
