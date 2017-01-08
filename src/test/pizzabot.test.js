var should = require('should');
var Pizzabot = require("../main/bot/pizzabot").Pizzabot;
var pizzatest1 = require("./pizza.testdata.1");
var pizzatest2 = require("./pizza.testdata.2");
var pizzatest3 = require("./pizza.testdata.3");
var pizzatest4 = require("./pizza.testdata.4");

describe('pizzabot', function() {
  describe('#onPizzaChannelMessage()', function() {
    let bot = new Pizzabot();
    it('should return correct no of orders', function() {
      pizzatest1.reverse().forEach(i => bot.onPizzaChannelMessage(i));

      bot.orders.size.should.be.equal(3);
      bot.orders.should.have.key("Milano");
      bot.orders.should.have.key("Mamamia");
      bot.orders.should.have.key("Capricciosa");
    });

    it('should return correct multiorders', function() {
      pizzatest2.reverse().forEach(i => bot.onPizzaChannelMessage(i));

      bot.orders.should.have.key("Diavolo");
      bot.orders.should.have.key("Sanremo");
      bot.orders.should.have.key("Salami");
      bot.orders.should.have.key("Provinciale");
      bot.orders.get("Provinciale").should.have.size(2);
      bot.orders.should.have.key("Toscana");
      bot.orders.get("Toscana").should.have.size(2);
    });

    it('should know day changes', function() {
      pizzatest1.reverse().forEach(i => bot.onPizzaChannelMessage(i));
      bot.orders.should.not.have.key("Diavolo");
      pizzatest2.reverse().forEach(i => bot.onPizzaChannelMessage(i));
      bot.orders.should.have.key("Diavolo");
    });

    it('should filter messages from bots', function() {
      let msg = {
        type: 'message',
        subtype: 'bot_message',
        user: 'U04F3P9QJ',
        text: 'milano bitte',
        ts: '1482141802.000044'
      };
      let bot = new Pizzabot({
        reactions: {
          add: function() {
            throw new Error('reactions.add called')
          }
        }
      });
      bot.onPizzaChannelMessage(msg);

    });

    it('should answer order lists', function() {
      let msg = {
        type: 'message',
        user: 'U06MSLT7H',
        text: 'orders',
        channel: 'test',
        ts: '1481538257.000036',
      };
      let answer = [];
      let bot2 = new Pizzabot({
        reactions: {
          add: (...args) => {}
        },
        chat: {
          postMessage: (...args) => {
            answer.push(args);
          }
        },

      });
      pizzatest4.reverse().forEach(i => bot2.onPizzaChannelMessage(i));
      bot2.onPizzaChannelMessage(msg);

      answer.should.containEql(['test', '2x Provinciale (<@U06QLURC1> <@U07BCV4AE>)']);
      answer.should.not.matchAny(([test, pizza]) => pizza.should.match(/Diavolo/));
    });


  });



});
