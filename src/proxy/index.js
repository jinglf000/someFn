// proxy meta programming

const handler = {
  get(target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return `Hello ${name}`;
  },
  apply(target, thisBinding, args) {
    return target.apply(null, args);
  },
  construct(target, args) {
    return { value: args[1] };
  }
};

const proxyFn = new Proxy(function(x, y) {
  debugger;
  return x + y;
}, handler);

// console.log(proxyFn(1, 2)); //被 apply 拦截了，代理后，原对象保持不变；访问代理对象的时候方法时，会被起handler 拦截到； apply
// console.log(new proxyFn(1, 2)); //被 construct 拦截到

const person = { name: '张三' };
const proxyPerson = new Proxy(person, {
  get(target, property) {
    if (property in target) {
      return target[property];
    } else {
      throw new ReferenceError(`Property ${property} does not exit`);
    }
  }
});

const obj = Object.create(proxyPerson);
obj.name;

console.log(obj.name);

/**
 * 1、proxy 可以代理任何对象，full language，代理多种执行方式；（proxy拦截方法提供）
 * 2、proxy代理时不会改变原对象，想使用代理，需要使用代理返回的对象；new Proxy(target, handler)
 * 3、代理时this指向proxy本身，并且代理后的对象和普通对象一致，可以继承
 */
