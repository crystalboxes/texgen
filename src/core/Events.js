import stringify from "json-stable-stringify";

const defaultHashStr = "0";
class Events {
  static Type = {
    ParameterChanged: 0,
  };
  static eventListeners = {};

  static invoke(eventType, ev, targetObject) {
    let invokeListenerFunction = function (fn) {
      if (typeof fn === "object" && Array.isArray(fn)) {
        let invokableFunction = fn[0];
        if (fn.length == 2) {
          invokableFunction = fn[0].bind(fn[1]);
        }
        invokableFunction(ev);
      } else {
        fn(ev);
      }
    };
    let listeners = Events.eventListeners[eventType];
    if (listeners) {
      for (let fn of listeners[defaultHashStr]) {
        invokeListenerFunction(fn);
      }
      if (targetObject) {
        let stringified = stringify(targetObject);
        if (stringified in listeners) {
          for (let fn of listeners[stringified]) {
            invokeListenerFunction(fn);
          }
        }
      }
    }
  }

  static addEventListener(eventType, listenerFunction, targetObject) {
    let hashStr = defaultHashStr;
    if (targetObject) {
      hashStr = stringify(targetObject);
    }
    let listeners = Events.eventListeners[eventType];
    if (!listeners) {
      listeners = {};
      listeners[hashStr] = [];
    }
    listeners[hashStr].push(listenerFunction);
    Events.eventListeners[eventType] = listeners;
  }
}

export default Events;
