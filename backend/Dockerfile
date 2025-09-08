FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN apk --no-cache add curl

RUN npm run build

EXPOSE 5050

CMD ["npm","start"]