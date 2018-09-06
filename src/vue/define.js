function observe(data) {
  if (!data || typeof data !== 'object') {
    return;
  }
  Object.keys(data).forEach(function (key) {
    defineReactive(data, key, data[key]);
  })
}

function defineReactive(data, key, val) {
  observe(val);
  var dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: false,
    get: function () {
      console.log(`get some Value ${val}`);
      Dep.target && dep.addDep(Dep.target);
      return val;
    },
    set: function (newVal) {
      console.log(`set new Value ${newVal}`);
      if (newVal === val) return;
      val = newVal;
      dep.notify();
    }
  });
}

var data = {
  name: 'helloWorld'
};

observe(data);

function Dep() {
  this.subs = [];
}

Dep.prototype.addSub = function(sub) {
  this.subs.push(sub);
}

Dep.prototype.notify = function() {
  this.subs.forEach((sub) => {
    sub.update();
  })
}

function Watcher(vm, exp, cb) {
  this.cb = cb;
  this.vm = vm;
  this.exp = exp;

}

Watcher.prototype = {
  update: function () {
    this.run();
  },
  run: function () {
    var value = this.get();
    var oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal)
    }
  },
  get: function () {
    Dep.target = this;
    var value = this.vm[exp];
    Dep.target = null;
    return value;
  }
}
