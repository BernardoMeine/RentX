FROM node:latest


WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 4664

CMD ["npm","run","dev"]