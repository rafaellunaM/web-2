
FROM node:14.14.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app

EXPOSE 3000

CMD ["node", "index.js"]
