FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install express express-openid-connect --save
RUN npm install node-cache --save
RUN npm install mysql
RUN npm install js-md5
RUN npm install dateformat
RUN npm install node-fetch
RUN npm install @sendgrid/mail
RUN npm install simple-oauth2
RUN npm install googleapis
RUN npm install google-auth-library
RUN npm install jsonwebtoken
RUN npm install cookie-parser
RUN npm install ejs
RUN npm install query-string
RUN npm install request bluebird
RUN npm install discord.js

COPY . .

EXPOSE 8081

CMD [ "node", "server.js" ]


