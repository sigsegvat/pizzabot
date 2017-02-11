"use strict";
let slack = require('@slack/client');
let bot = require('./bot/pizzabot');

let bot_token = process.env.slack_bot_token;

let rtm = new slack.RtmClient(bot_token);
let web = new slack.WebClient(bot_token);

let pizzabot = new bot.Pizzabot(web);

rtm.on(slack.CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
  console.log(`Logged in as ${rtmStartData.self.name}`);
});

rtm.on(slack.RTM_EVENTS.MESSAGE, (msg) => {
  console.log(msg);
  pizzabot.onPizzaChannelMessage(msg);
});

rtm.start();
