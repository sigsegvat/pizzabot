let should = require('should');
let pizzalist = require("./pizza-detector");

describe('pizzalist', () => {
    describe('#hasPizza()', () => {
        it("should know Margherita", () => {
            let hasPizza = pizzalist.hasPizza("ich will margherita");
            hasPizza.should.not.be.null();
            hasPizza.name.should.be.equal("Margherita");
        });

        it("should not detect dogfood", () => {
            let hasPizza = pizzalist.hasPizza("nom nom hundefuter");
            should.not.exist(hasPizza);
        });

        it("should know Magarita", () => {
            let hasPizza = pizzalist.hasPizza("ich magarita bitte");
            hasPizza.name.should.be.equal("Margherita");
        });

        it("should know Diabolo", () => {
            let hasPizza = pizzalist.hasPizza("ich diabolo bitte");
            hasPizza.name.should.be.equal("Diavolo");
        });


    });

    describe('#findPizza()', () => {
        it("should find Zwiebel und Ei", () => {
            let pizze = pizzalist.findPizza("zwiebel", "Ei");
            pizze.should.containEql("Mamamia (Tomaten,Käse,Schafkäse,Ei,Zwiebel)");
        });
        it("should know Käse Ei", () => {
            let pizze = pizzalist.findPizza("Käse", "Ei");
            pizze.should.containEql("Mamamia (Tomaten,Käse,Schafkäse,Ei,Zwiebel)");
        });
    });
});
