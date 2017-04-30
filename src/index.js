"use strict";
let slack = require('@slack/client');
let bot = require('./bot/pizzabot');
let client = require('./bot/client');
let OrderDb = require('./bot/order-db').OrderDb;
let AWS = require("aws-sdk");

AWS.config.update({
    region: "eu-west-1",
});
require('dotenv').config();

let bot_token = process.env.slack_bot_token;

let rtm = new slack.RtmClient(bot_token);
let web = new slack.WebClient(bot_token);

let pizzaClient = new client.Client(web);
let orderDb = new OrderDb(new AWS.DynamoDB.DocumentClient());
let pizzabot = new bot.Pizzabot(pizzaClient, orderDb);

rtm.on(slack.CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
    console.log(`Logged in as ${rtmStartData.self.name}`);
});

rtm.on(slack.RTM_EVENTS.MESSAGE, (msg) => {
    pizzabot.onPizzaChannelMessage(msg);
});

rtm.start();
console.log("started pizzabot");
