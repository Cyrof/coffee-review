FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN apt update 
RUN apt upgrade -y

RUN npm install

RUN mkdir -p /app/data
COPY . .

EXPOSE 4000

CMD ["npm", "start"]