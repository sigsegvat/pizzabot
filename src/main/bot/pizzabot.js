let pizzalist = require("./pizza-detector");
let chain = require("./filter-chain").chain;

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
          .when((msg) => pizzalist.detectPizza(msg.text))
            .consume(this.addOrder)
          .end()
          .when((msg) => msg.text === "orders")
            .consume(this.displayOrders);
          end()
        .end();
    } catch (e) {
      LOG(e);
    }
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
      for (let [pizza,users] of this.orders) {
        let clients = [...users].map( user => `<@${user}>`).join(" ");
        this.client.chat.postMessage(msg.channel, `${users.size}x ${pizza} (${clients})`);
      }
  }

  addOrder(msg) {
    if (pizzalist.hasPizza(msg.text, order => this.processOrder(order, msg))) {
      LOG(`processedOrder`);
      return true;
    } else {
      return false;
    }
  }

  processOrder(order, msg) {
    let user = msg.user;
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
