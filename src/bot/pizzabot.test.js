let should = require('should');
let Pizzabot = require("./pizzabot").Pizzabot;
let Client = require("./client").DummyClient;
let OrderDb = require("./order-db").DummyDb;

let pizzatest1 = require("../slack-testdata/pizza.testdata.1");
let pizzatest2 = require("../slack-testdata/pizza.testdata.2");
let pizzatest3 = require("../slack-testdata/pizza.testdata.3");
let pizzatest4 = require("../slack-testdata/pizza.testdata.4");
let pizzatest5 = require("../slack-testdata/pizza.testdata.5");

describe('pizzabot', function () {
    describe('#onPizzaChannelMessage()', function () {



        it('should return correct no of orders', function () {
            let bot = new Pizzabot(new Client());

            pizzatest1.reverse().forEach(i => bot.onPizzaChannelMessage(i));

            bot.orders.size.should.be.equal(3);
            bot.orders.should.have.key("Milano");
            bot.orders.should.have.key("Mamamia");
            bot.orders.should.have.key("Capricciosa");
        });

        it('should return correct multiorders', function () {
            let bot = new Pizzabot(new Client());

            pizzatest2.reverse().forEach(i => bot.onPizzaChannelMessage(i));

            bot.orders.should.have.key("Diavolo");
            bot.orders.should.have.key("Sanremo");
            bot.orders.should.have.key("Salami");
            bot.orders.should.have.key("Provinciale");
            bot.orders.get("Provinciale").should.have.size(2);
            bot.orders.should.have.key("Toscana");
            bot.orders.get("Toscana").should.have.size(2);
        });


        it('should clear orders', function () {
            let bot = new Pizzabot(new Client());

            pizzatest2.reverse().forEach(i => bot.onPizzaChannelMessage(i));
            bot.onPizzaChannelMessage({text: "clear <@U06P2GUBX>", user: "U04F3P9QJ"});
            should(bot.orders.get("Diavolo")).be.undefined();
        });

        it('should filter messages from bots', function () {
            let msg = {
                type: 'message',
                subtype: 'bot_message',
                user: 'U04F3P9QJ',
                text: 'milano bitte',
                ts: '1482141802.000044'
            };
            let client = new Client();
            client.addReactionToMessage = () => {
                throw new Error('reactions.add called');
            };

            let bot = new Pizzabot(client);
            bot.onPizzaChannelMessage(msg);

        });

        it('should answer order lists', function () {

            let client = new Client();
            let orderDb = new OrderDb();
            let bot = new Pizzabot(client,orderDb);
            let msg = {
                type: 'message',
                user: bot.adminUser,
                text: 'orders',
                channel: 'test',
                ts: '1481538257.000036',
            };

            pizzatest4.reverse().forEach(i => bot.onPizzaChannelMessage(i));
            bot.onPizzaChannelMessage(msg);

            client.messages[0].split("\n").should.containEql("2x Provinciale (<@U06QLURC1> <@U07BCV4AE>)");
            client.reactions[0].should.not.containEql('Diavolo');

            orderDb.calls.should.have.size(1);

        });

        it('should detect users', function () {
            Pizzabot.detectUser("blubb").should.be.false();
            Pizzabot.detectUser("magaritha für <@TEST>").should.be.true();
            Pizzabot.detectUser("<@U0MHZ3ARM|gabor.liptak> will pizza").should.be.true();
        });


        it('add orders for others', function () {
            let bot = new Pizzabot(new Client());
            pizzatest5.reverse().forEach(i => bot.onPizzaChannelMessage(i));
            bot.orders.should.have.key("Provinciale");
            bot.orders.should.have.key("Toscana");
            bot.orders.get("Toscana").should.have.key('U15AX2X9P');

        });

        it('should list pizzas', function () {
            let client = new Client();
            let bot = new Pizzabot(client);
            bot.onPizzaChannelMessage({
                type: 'message', channel: 'test',
                user: 'U0MHZ3ARM',
                text: 'pizza Ei Zwiebel',
                ts: '1482144986.000046'
            });
            client.messages.should.containEql('Mamamia (Tomaten,Käse,Schafkäse,Ei,Zwiebel)\n');
        });



    });


});
