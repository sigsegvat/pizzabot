let chain = require("../main/bot/filter-chain.js").chain;
let should = require('should');

describe('filter-chain', function() {
  it('should process', function() {
    let called = false;
    chain({
        text: "hello"
      })
      .when((m) => true)
      .process((m) => {
        called = true
      });

    should(called).equal(true);
  });

  it('should consume', function() {
    let called = false;
    chain({
        text: "hello"
      })
      .when((m) => m.text)
      .consume((m) => false)
      .process((m) => {
        called = true
      });

    should(called).equal(true);
  });



  it('should map', function() {
    let called = false;
    let msg;
    chain({
        text: "hello"
      })
      .when((m) => m.text == "hello")
      .consume((m) => false)
      .process((m) => "juhu")
      .process((m) => {
        called = true;
        return m;
      })
      .consume((m) => {
        msg = m;
        return true;
      })
      .process((m) => {
        msg = "XXX";
      });

    should(called).equal(true);
    msg.should.equal("XXX");
  });

  it('should have a choice', function() {
    let called = false;

    chain("hello")
      .when((m) => m == "hello")
        .consume((m) => {
          called = true;
        })
        .when(() => false)
          .consume((m) => {
            throw new Error("");
          })
        .end()
      .end()
      .when((m) => m != "hello")
      .consume((m) => {
        throw new Error("");
      })


    should(called).equal(true);

  });



});
