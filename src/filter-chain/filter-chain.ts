interface Chainable {

  when: (f:ChainFunction) => Chainable,
  end: () => Chainable,
  process: (f: ChainFunction) => Chainable,
  consume: (f:ChainFunction) => Chainable,

}

interface ChainFunction {
    (message:any):boolean
}


class Chain implements Chainable{

  private message: any;
  private caller: any;


  constructor(message, caller?) {
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

const block = (parent?) => new BlockedChain(parent);

class BlockedChain implements Chainable{

  private parent?:Chainable;

  constructor(parent){
    this.parent = parent;
  }

  when = (f) => block(this);
  consume = (f) => this;
  process = (f) => this;

  end = () => {
    return this.parent? this.parent : this;
  }
}

export function chain (message:any, caller:any){return new Chain(message, caller)};