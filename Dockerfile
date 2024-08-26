FROM ianwalter/puppeteer:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "test:all:chrome"]
