/**
 * 面向对象的方式实现UI组件；看着像传统类一样，实际是委托的方式 proxy 委托控件类
 * 这种方式以后也是主流的方式
 * 过程式代码 简单 易懂 流程清晰明了 ----- 维护不方便
 * 面向对象式 复杂 抽象 ---- 易于维护和扩展
 * @author jinglf000
 * ###### Tue Mar 6 17:04:36 CST 2018
 */

/**
 * Widget 类
 * @param {Number} width 宽
 * @param {Number} height 高
 */
function Widget(width, height) {
  this.width = width || 50;
  this.height = height || 50;
  this.$elem = null;
}

/**
 * render 渲染函数
 * @param {DOM}  $where 外部DOM对象
 */
Widget.prototype.render = function($where) {
  if (this.$elem) {
    this.$elem.style = `width:${this.width}px;height:${this.height}px`;
    $where.appendChild(this.$elem);
  }
};

/**
 * Button 子类
 * @param {Number} width 宽
 * @param {Number} height 高
 * @param {String} label 标志
 */
function Button(width, height, label) {
  Widget.call(this, width, height);
  this.label = label || 'Default';
  this.$elem = document.createElement('button');
  this.$elem.innerText = this.label;
}

// 子类继承 Widget
Button.prototype = Object.create(Widget.prototype);

/**
 * 子类render函数
 * @param {DOM} $where DOM对象
 */
Button.prototype.render = function($where) {
  Widget.prototype.render.call(this, $where);
  this.$elem.addEventListener('click', this.onClick.bind(this));
};

Button.prototype.onClick = function(evt) {
  console.log(`Button ${this.label} clicked！`);
};

// window.addEventListener('DOMContentLoaded', function() {
//   var btn1 = new Button(30, 50, 'btn1');
//   var btn2 = new Button(150, 80, 'world');

//   btn1.render(document.body);
//   btn2.render(document.body);
// });

function ES6Type() {
  class Widget {
    constructor(width = 50, height = 50) {
      this.width = width;
      this.height = height;
      this.$elem = null;
    }

    render($where) {
      if (this.$elem) {
        this.$elem.style = `width:${this.width}px;height:${this.height}px;`;
        $where.appendChild(this.$elem);
      }
    }
  }

  class Button extends Widget {
    constructor(width = 50, height = 50, label = 'Default') {
      super(width, height);
      this.label = label;
    }
    render($where) {
      const ele = document.createElement('button');
      ele.innerText = this.label;
      this.$elem = ele;
      super.render($where);
      this.$elem.addEventListener('click', this.onClick.bind(this));
    }
    onClick() {
      console.log(` this is button ${this.label}`);
    }
  }
  window.addEventListener('DOMContentLoaded', function() {
    var btn1 = new Button(30, 50, 'btn1');
    var btn2 = new Button(150, 80, 'world');

    btn1.render(document.body);
    btn2.render(document.body);
  });
}
ES6Type();
