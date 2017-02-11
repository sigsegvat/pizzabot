FROM node:6.9
WORKDIR /opt/slackbot
ADD package.json .
RUN npm install
ADD webpack.config.js .
ADD src/ ./src/
RUN ls
RUN pwd
RUN npm test
RUN npm run build
CMD node target/slackbot/index.js
