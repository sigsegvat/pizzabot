class Chain {

  constructor(message, caller) {
    this.message = message;
    this.caller = caller ? caller : this;
  }

  _cb(f, success, fail) {

    if (f.call(this.caller,this.message)) {
      return success;
    } else {
      return fail;
    }
  }

  end() {
    return this;
  }

  filter(f) {
    return this._cb(f, this, block(this));
  }

  map(f) {
    return new Chain(f.call(this.caller,this.message));
  }

  process(f) {
    return this._cb(f, this, this);
  }

  consume(f) {
    return this._cb(f, block(), this);
  }

}

let block = (parent) => new BlockedChain(parent);


class BlockedChain {
  constructor(parent){
    this.parent = parent;
  }

  filter() {
    return this;
  }
  process() {
    return this;
  }
  consume() {
    return this;
  }
  map() {
    return this;
  }
  end() {
    return this.parent? this.parent : this;
  }
}

module.exports = {
  chain: (m,c) => new Chain(m,c)
}
