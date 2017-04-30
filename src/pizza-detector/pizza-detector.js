let pizzalist = require("./pizzeria-ambiente");

let detectPizza = (text) => {
    return hasPizza(text) !== undefined;
};

let hasPizza = (sencentce) => {
    if(!sencentce) return false;
    return pizzalist.find(p => {
        return sencentce.toLowerCase().search(p.regex.toLowerCase()) !== -1;
    });
};

let findPizza = (...args) => {
    return pizzalist.filter((pizza) => {
        let match = pizza.ingredients.filter((p) => {
            for (term of args) {
                if (term.toLowerCase() === p.toLowerCase()) {
                    return true;
                }
            }
            return false;
        });
        return match.length === args.length;
    }).map(p => `${p.name} (${p.ingredients})`);
};

module.exports = {
    hasPizza: hasPizza,
    detectPizza: detectPizza,
    pizzalist: pizzalist,
    findPizza: findPizza
};
