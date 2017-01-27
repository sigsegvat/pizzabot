FROM node:6.9
WORKDIR /app/
ADD target/ .
RUN tar -xzf slackbot.tar.gz
WORKDIR /app/slackbot
CMD node index.js