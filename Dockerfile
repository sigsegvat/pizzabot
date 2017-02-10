FROM node:6.9
ADD package.json .
RUN npm install
ADD webpack.config.js .
ADD src/ .
RUN npm run build
CMD node target/slackbot/index.js
