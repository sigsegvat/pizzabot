"use strict";
let chain = require("./filter-chain").chain;
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

    should(called).equal(false);
  });



  it('should map', function() {
    let called = false;
    let msg;
    chain({
        text: "hello"
      })
      .when((m) => m.text == "hello")
      .process((m) => "juhu")
      .process((m) => {
        called = true;
        return m;
      })
      .consume((m) => {
        msg = "XXX1";
      })
      .process((m) => {
        msg = "YYY";
      });

    should(called).equal(true);
    msg.should.equal("XXX1");
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

  it('should execute double when', function() {


    chain("hello")
      .when(() => false)
        .when(() => true)
          .consume((m) => {
            throw new Error("");
          })
        .end()
        .when(() => true)
          .consume((m) => {
            throw new Error("");
          })
        .end()
      .end()


  });



});
