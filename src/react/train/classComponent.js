/**
 *
 * @param {String} str HTML str
 */
function createDOMFromString(str) {
  const div = document.createElement('div');
  div.innerHTML = str;
  return div;
}


/* supper Parent */
class Component {
  setState(state) {
    const oldEl = this.el;
    this.state = state;
    this._renderDOM();
    if (this.onStateChange) this.onStateChange(oldEl, this.el)
  }

  _renderDOM() {
    this.el = createDOMFromString(this.render());
    if (this.onClick) {
      this.el.addEventListener('click', this.onClick.bind(this), false);
    }
    return this.el;
  }
}

/**
 * mount component to real DOM
 * @param {Component} component instance
 * @param {DOM} wrapper need insert DOM
 */
const mount = (component, wrapper) => {
  var ele = component._renderDOM();
  window.ele = ele;
  wrapper.appendChild(ele);
  component.onStateChange = (oldEl, newEl) => {
    wrapper.insertBefore(newEl, oldEl);
    wrapper.removeChild(oldEl);
  }
}


class LikeButton extends Component {
  constructor(props = {}) {
    super(props);
    this.props = props;
    this.state = { isLiked: false };
  }

  onClick() {
    this.setState({
      isLiked: !this.state.isLiked
    });
  }

  render() {
    return (`
      <button class="like-btn" style="background-color: ${this.props.bgColor}">
        <span class="like-btn">${this.state.isLiked ? '取消' : '点赞'}</span>
      </button>
    `)
  }
}


mount(new LikeButton({ bgColor: 'red'}), document.body);
