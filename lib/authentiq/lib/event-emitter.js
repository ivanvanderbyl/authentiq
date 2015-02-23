class EventEmitter {
  constructor() {
    this.observers = {};
  }

  on(event, listener) {
    if (!this.observers) {
      throw new Error('You must call super when extending from EventEmitter');
    }
    this.observers[event.toString()] = this.observers[event.toString()] || [];
    this.observers[event.toString()].push(listener);
  }

  once(event, listener) {
    var emitter = this;
    var onceHandler = function(event) {
      emitter.off(event, onceHandler);
      listener.apply(null, arguments);
    };
    return this.on(event, onceHandler);
  }

  off(event, listener) {
    if (! this.observers[event]) {
      return;
    }

    this.observers[event].forEach(() => {
      if (! listener) {
        delete this.observers[event];
      } else {
        var index = this.observers[event].indexOf(listener);
        if (index > -1) {
          this.observers[event].splice(index, 1);
        }
      }
    });
  }

  emit(event, ...args) {
    if (! this.observers[event]) {
      return;
    }

    this.observers[event].forEach(function(observer) {
      observer(...args);
    });
  }

  trigger(...args) { this.emit(...args) }
}

export default EventEmitter;
