/**
 * 类
 * @author jinglf000
 * ###### Sun Mar 4 21:45:56 CST 2018
 */
class Vehicle {
  constructor(str) {
    this.str = str;
  }

  do() {
    console.log('Yes, These are Class Vehicle。');
  }
}

class Car extends Vehicle {
  constructor(name) {
    super(`${name}hahaa`);
    this.name = name;
  }
  // 定义静态方法
  static myName() {
    console.log('this is a static Method,only can execute by Class Car');
  }
  // 定义属性的getter 和 setter
  get prop() {}

  set prop(val) {}
  // class 不支持定义私有方法 上面代码中，_bar方法前面的下划线，
  // 表示这是一个只限于内部使用的私有方法。但是，这种命名是不保险的，
  // 在类的外部，还是可以调用到这个方法。
  cando() {
    console.log(this.name);
  }

  say() {
    console.log('yes i can say');
  }
}

var bmw = new Car('bwm');

console.log(bmw);

console.log(Object.getPrototypeOf(bmw) === Car); // false
console.log(Object.getPrototypeOf(bmw) === Vehicle); // true呼应了ES6继承的实质
// ES6的继承为在父类的基础之上进行加工
