FROM node:latest

WORKDIR /app
RUN mkdir /app/data

COPY package*.json ./

RUN apt update 
RUN apt upgrade -y

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]