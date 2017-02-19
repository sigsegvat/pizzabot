var should = require('should');
var pizzalist = require("../main/bot/pizza-detector");

describe('pizzalist', () => {
  describe('#hasPizza()', () => {
    it("should know Margherita", () => {
      var hasPizza = pizzalist.hasPizza("ich will margherita");
      hasPizza.should.not.be.null();
      hasPizza.name.should.be.equal("Margherita");
    });

    it("should not detect dogfood", () => {
      var hasPizza = pizzalist.hasPizza("nom nom hundefuter");
      should.not.exist(hasPizza);
    });

    it("should know Magarita", () => {
      var hasPizza = pizzalist.hasPizza("ich magarita bitte");
      hasPizza.name.should.be.equal("Margherita");
    });

    it("should know Diabolo", () => {
      var hasPizza = pizzalist.hasPizza("ich diabolo bitte");
      hasPizza.name.should.be.equal("Diavolo");
    });


  });
  
  describe('#findPizza()', () => {
    it("should find Zwiebel und Ei", () => {
      var pizze = pizzalist.findPizza("Zwiebeln", "Ei");
      pizze.should.containEql("Mamamia (Tomaten,Käse,Schafkäse,Ei,Zwiebeln)");
    });
    it("should know Käse Ei", () => {
      var pizze = pizzalist.findPizza("Käse", "Ei");
      pizze.should.containEql("Mamamia (Tomaten,Käse,Schafkäse,Ei,Zwiebeln)");
    });
  });
});
