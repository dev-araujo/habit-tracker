#  imagem base oficial do Node.js
FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Sem nodemon
# CMD ["npm", "start"] 

# Com nodemon
CMD ["npm", "run", "dev"] 
