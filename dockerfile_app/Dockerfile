FROM node:14
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
# ENTRYPOINT [ "npm", "start" ]
