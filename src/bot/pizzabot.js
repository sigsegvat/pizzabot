"use strict";
let pizzalist = require("../pizza-detector/pizza-detector");

let LOG = () => console.log;

class Pizzabot {

    constructor(client) {
        this.client = client;
        this.orders = new Map();
        this.date = new Date();
        this.adminUser = "U04F3P9QJ";
        this.pizzaMaster = this.adminUser;
    }

    getCurrentDate() {
        return `${this.date.getDate()}/${this.date.getMonth() + 1}`;
    }

    checkDate() {
        let d = new Date();
        if (this.date.getDate() !== d.getDate() || this.date.getMonth() !== d.getMonth()) {
            this.orders = new Map();
            this.date = d;
        }
    }

    onPizzaChannelMessage(msg) {

        try {
            this.checkDate();

            if (this.client.isBotMessage(msg)) {
                return null;
            }

            if (this.isAdmin(msg)) {
                if(msg.text.toLowerCase().startsWith("pizzamaster") && Pizzabot.detectUser(msg.text)){
                    this.pizzaMaster = Pizzabot.getUser(msg.text);
                }
            }

            if (this.isAdmin(msg) || this.isPizzaMaster(msg)) {
                if (msg.text === "clear") {
                    this.orders = new Map();
                }
                if (pizzalist.detectPizza(msg.text) && Pizzabot.detectUser(msg.text)) {
                    this.addOrderFor(msg);
                }
            }

            if (pizzalist.detectPizza(msg.text)) {
                this.addOrder(msg);
            }

            if (msg.text === "orders") {
                this.displayOrders(msg);
            }

            if (msg.text.startsWith("pizza")) {
                this.pizzalist(msg);
            }

        } catch (e) {
            LOG(e);
        }
    }

    pizzalist(message) {
        let pizzaMessage = "";
        for (let pizza of pizzalist.findPizza.apply(null, message.text.split(" ").slice(1))) {
            pizzaMessage += pizza + "\n"
        }
        this.client.replyMessageToChannel(pizzaMessage, message);
        return true;
    }

    static detectUser(text) {
        return text.search("<@([A-Z0-9]+)(|[^>]*)?>") !== -1;
    }

    static getUser(text) {
       return text.match("<@([A-Z0-9]+)(|[^>]*)?>")[1]
    }

    addOrderFor(msg) {
        let user = Pizzabot.getUser(msg.text);
        let foundPizza = pizzalist.hasPizza(msg.text);
        if (foundPizza) {
            LOG(`processeing order ${foundPizza}`);
            this.processOrderFor(foundPizza, msg, user)
        }
    }

    isAdmin(msg) {
        return msg.user === this.adminUser;
    }

    isPizzaMaster(msg) {
        return msg.user === this.pizzaMaster;
    }

    displayOrders(msg) {
        let d = this.getCurrentDate();
        let orderMessage = `orders for ${d}, pizzamaster <@${this.pizzaMaster}> :\n`;
        for (let [pizza, users] of this.orders) {
            let clients = [...users].map(user => `<@${user}>`).join(" ");
            orderMessage += `${users.size}x ${pizza} (${clients})\n`
        }
        this.client.replyMessageToChannel(orderMessage, msg);
    }

    addOrder(msg) {
        let foundPizza = pizzalist.hasPizza(msg.text);
        if (foundPizza) {
            LOG(`processing order ${foundPizza}`);
            this.processOrderFor(foundPizza, msg, msg.user)
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
            this.orders.get(order.name).add(user);
        }
        this.client.addReactionToMessage("pizza", msg);
    }

    removeDuplicateUserInOrders(user) {
        for (let [pizza, users] of this.orders) {
            if (users.has(user)) {
                users.delete(user);
                if (users.size === 0) {
                    this.orders.delete(pizza);
                }
            }
        }
    }


}
;
module.exports = {};
module.exports.Pizzabot = Pizzabot;
