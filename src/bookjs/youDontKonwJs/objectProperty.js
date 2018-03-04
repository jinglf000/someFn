/**
 * 对象属性的特性，描述
 * @author jinglf000
 * ###### Sun Mar 4 09:59:39 CST 2018
 */

function consoleLog1() {
  const obj = {
    name: '110',
    age: 13
  };
  console.log(Object.getOwnPropertyDescriptor(obj, 'age'));
}

// consoleLog1();

function consoleLog2() {
  console.log('第一次打印', obj.age);
  delete obj.age;
  console.log('第一次打印 delete', obj.age);

  Object.defineProperty(obj, 'age', {
    value: 15,
    writable: true,
    configurable: false,
    enumerable: true
  });

  // 当属性的configurable 设为false时，该属性不可删除
  console.log('第二次打印 ', obj.age);
  delete obj.age;
  console.log('第二次打印 delete', obj.age);
}

// consoleLog2();

// 一些应用

function consoleLog3() {
  var innerObj = {};
  Object.defineProperty(innerObj, 'COLOR', {
    writable: false,
    configurable: false,
    value: 'YellowGreen'
  });
}

// getter && setter
function consoleLog4() {
  /* 当你给一个属性定义 getter、setter 或者两者都有时，这个属性会被定义为“访问描述
  符”（和“数据描述符”相对）。对于访问描述符来说，JavaScript 会忽略它们的 value 和
  writable 特性，取而代之的是关心 set 和 get （还有 configurable 和 enumerable ）特性。   */
  var myObj = {
    get a() {
      return 2;
    },
    get newA() {
      console.log('execute newA Getter functions');
      return this._a_;
    },
    set newA(val) {
      console.log('execute newA Setter functions');
      this._a_ = val * 2;
    }
  };

  Object.defineProperty(myObj, 'b', {
    get: function() {
      return this.a * 2;
    },
    enumerable: true
  });
  /* 为了让属性更合理，还应当定义 setter，和你期望的一样，setter 会覆盖单个属性默认的
[[Put]] （也被称为赋值）操作。通常来说 getter 和 setter 是成对出现的（只定义一个的话
通常会产生意料之外的行为）： */

  // for in , Object.keys Object.getOwnPropertyNames 只能遍历那些可遍历的属性，enumerable设置为false不可遍历
  // for in 能够遍历对象的“可遍历”属性，包括其原型链上的属性[[prototype]]，
  // 而Object上的constructor hasOwnProperty enumerable 均为false

  // 可以替代的遍历方法，Object.keys() Object.getOwnPropertyNames(obj) ==> array 只遍历本对象的属性，不会遍历原型链

  // Symbol js中第七种基本类型，定义方法var x =  Symbol()，typeof x = 'symbol'；本质为类似于字符串的数据类型。
  // 由于其返回的值均不相同，Symbol() !== Symbol();因此可以被当做为对象的属性名来使用，缺点，对象使用(赋值获取)时必须通过
  // var sym = Symbol(); var obj = {[sym]: '这是一个symbol的key'} obj[sym];永远都不用担心属性名重复了
}

// 定义函数的iterator遍历器函数@@iterator
function consoleLog5() {
  var objHasIterator = {
    name: '小林子',
    age: 24
  };
  Object.defineProperty(objHasIterator, Symbol.iterator, {
    enumerable: false,
    writable: false,
    configurable: false,
    value: function() {
      var self = this;
      var ks = Object.keys(self);
      var i = 0;
      return {
        next: function() {
          return {
            value: self[ks[i++]],
            done: i > ks.length
          };
        }
      };
    }
  });
  // for of对属性的值进行遍历
  for (let i of objHasIterator) {
    console.log(i);
  }
}
consoleLog5();
