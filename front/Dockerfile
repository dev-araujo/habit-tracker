FROM node:alpine

WORKDIR /usr/src/app

RUN npm install -g @angular/cli

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]
