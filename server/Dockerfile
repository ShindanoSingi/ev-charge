FROM node:17

# Work directory
WORKDIR /usr/server/server

# Copy Package Json to the work directory
COPY package*.json ./

# Install Files
RUN npm install

# Copy Source Filesi
COPY . .

# Build
RUN npm run build

# Expose the API port
EXPOSE 1337

CMD [ "node","build/server.js" ]
