FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install express express-openid-connect --save
RUN npm install node-cache --save
RUN npm install mysql --save
RUN npm install js-md5 --save
RUN npm install dateformat --save
RUN npm install node-fetch --save
RUN npm install @sendgrid/mail --save
RUN npm install simple-oauth2 --save
RUN npm install googleapis --save
RUN npm install google-auth-library --save
RUN npm install jsonwebtoken --save
RUN npm install cookie-parser --save
RUN npm install ejs --save
RUN npm install query-string --save
RUN npm install request bluebird --save
RUN npm install discord.js --save

COPY . .

EXPOSE 8080

CMD [ "node", "server.js" ]


