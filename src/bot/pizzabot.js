"use strict";
let pizzalist = require("../pizza-detector/pizza-detector");
let chain = require("../filter-chain/filter-chain").chain;

const DUMMY_CLIENT = {
  chat: {
    postMessage: console.log
  },
  reactions: {
    _items: [],
    add: (...args) => {}
  }

};

let LOG =  () => 1; console.log;

class Pizzabot {

  constructor(client = DUMMY_CLIENT) {
    this.client = client;
    this.orders = new Map();
  }

  onPizzaChannelMessage(msg) {

    try {
      chain(msg,this)
        .when(this.noBotMessages)
          .when(this.isAdmin)
            .when((msg) => msg.text === "clear")
              .consume(() => this.orders = new Map())
            .end()
            .when((msg) =>  pizzalist.detectPizza(msg.text) && this.detectUser(msg.text))
              .consume((m) => this.addOrderFor(msg))
            .end()
          .end()
          .when((msg) => pizzalist.detectPizza(msg.text))
            .consume(this.addOrder)
          .end()
          .when((msg) => msg.text === "orders")
            .consume(this.displayOrders)
          .end()
          .when((msg) => msg.text.startsWith("pizza"))
            .consume(this.pizzalist)
          .end()
        .end();
    } catch (e) {
      LOG(e);
    }
  }

  pizzalist(message) {
    let pizzaMessage = "";
    for (let pizza of pizzalist.findPizza.apply(null,message.text.split(" ").slice(1))) {
        pizzaMessage += pizza + "\n"
    }
    this.client.chat.postMessage(message.channel, pizzaMessage);
    return true;
  }

  detectUser(text) {
    return text.search("<@([A-Z0-9]+)(|[^>]*)?>") != -1;
  }

  addOrderFor(msg) {
    let user = msg.text.match("<@([A-Z0-9]+)(|[^>]*)?>")[1];
    console.log(user);
    if (pizzalist.hasPizza(msg.text, order => this.processOrderFor(order, msg, user))) {
      LOG(`processedOrder`);
      return true;
    } else {
      return false;
    }
  }

 isAdmin(msg) {
   return msg.user === "U04F3P9QJ";
 }

  noBotMessages(msg) {

    if (msg.subtype === 'bot_message') {
      return false; //filter out
    } else if (msg.type === "message") {

      return true;
    } else {
      return true;
    }
  }

  displayOrders(msg) {
      let orderMessage = "";
      for (let [pizza,users] of this.orders) {
        let clients = [...users].map( user => `<@${user}>`).join(" ");
          orderMessage += `${users.size}x ${pizza} (${clients})\n`
      }
      this.client.chat.postMessage(msg.channel, orderMessage);
  }

  addOrder(msg) {
    if (pizzalist.hasPizza(msg.text, order => this.processOrderFor(order, msg, msg.user))) {
      LOG(`processedOrder`);
      return true;
    } else {
      return false;
    }
  }

  processOrderFor(order, msg, user) {
    this.removeDuplicateUserInOrders(user);
    if (!this.orders.has(order.name)) {
      this.orders.set(order.name, new Set([user]));
    } else {
      this.orders.get(order.name).add(user);;
    }
    this.client.reactions.add("pizza", {
      channel: msg.channel,
      timestamp: msg.ts
    });
  }

  removeDuplicateUserInOrders(user) {
    for(let [pizza,users] of this.orders) {
      if(users.has(user)) {
        users.delete(user);
        if(users.size == 0) {
          this.orders.delete(pizza);
        }
      }
    }
  }




};
module.exports = {};
module.exports.Pizzabot = Pizzabot;
