

function params(dateString, data) {
    return {
        TableName: 'PizzaOrders',
        Item: {
            "OrderDate": dateString,
            "OrderGroup": "#wh-pizza-monday",
            "Orders": data
        }
    }
}

class OrderDb {

    constructor(docClient) {
        this.docClient = docClient;
    }

    saveOrder(dateString, data) {
        let params2 = params(dateString, data);
        this.docClient.put(params2, function (err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            }
        });
    }

}

class DummyDb {

    constructor() {
        this.calls = {}
    }

    saveOrder(dateString, data) {
        this.calls[dateString] = data;
    }
}

module.exports = {};

module.exports.OrderDb = OrderDb;
module.exports.DummyDb = DummyDb;

