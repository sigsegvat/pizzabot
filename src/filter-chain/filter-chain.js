class Chain {

  constructor(message, caller) {
    this.message = message;
    this.caller = caller ? caller : this;
  }

  _build(f, success, fail) {
    if (f.call(this.caller,this.message)) {
      return success;
    } else {
      return fail;
    }
  }

  end() {
    return this;
  }

  when(f) {
    return this._build(f, this, block(this));
  }

  process(f) {
    this.message =   f.call(this.caller, this.message);
    return this;
  }

  consume(f) {
    f.call(this.caller,this.message)
    return block();
  }

}

let block = (parent) => new BlockedChain(parent);

class BlockedChain {
  constructor(parent){
    this.parent = parent;
    this.when = () => block(this);
    this.consume = () => this;
    this.process = () => this;
  }
  end() {
    return this.parent? this.parent : this;
  }
}

module.exports = {
  chain: (m,c) => new Chain(m,c)
}
