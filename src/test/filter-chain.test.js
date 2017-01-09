let chain = require("../main/bot/filter-chain.js").chain;
let should = require('should');

describe('filter-chain', function() {
  it('should process', function() {
    let called = false;
    chain({
        text: "hello"
      })
      .filter((m) => true)
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
      .filter((m) => m.text)
      .consume((m) => false)
      .process((m) => {
        called = true
      });

    should(called).equal(true);
  });

  it('should exec', function() {
    let called = false;
    chain({
        text: "hello"
      })
      .filter((m) => m.text)
      .consume((m) => true)
      .process((m) => {
        called = true
      });

    should(called).equal(false);
  });

  it('should map', function() {
    let called = false;
    let msg;
    chain({
        text: "hello"
      })
      .filter((m) => m.text == "hello")
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
        called = false;
        msg = "XXX";
      });

    should(called).equal(true);
    msg.should.equal("juhu");
  });

  it('should have a choice', function() {
    let called = false;

    chain("hello")
      .filter((m) => m == "hello")
        .consume((m) => {
          called = true;
        })
        .filter(() => false)
          .consume((m) => {
            throw new Error("");
          })
        .end()
      .end()
      .filter((m) => m != "hello")
      .consume((m) => {
        throw new Error("");
      })


    should(called).equal(true);

  });



});
