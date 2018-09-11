
/**
 * @param {String} str DOM string
 */
function createDOMFromString (str) {
  const div = document.createElement('div');
  div.innerHTML = str;
  return div;
}

class LikeButton {
  constructor() {
    this.state = {
      isLiked: false
    }
  }

  changleLikeText() {
    this.setState({
      isLiked: !this.state.isLiked
    });
  }

  setState(obj) {
    this.state = obj;
    this.render();
  }

  render() {
    const likeText = this.state.isLiked ? '取消' : '点赞';
    const ele = createDOMFromString(`
      <button class="like-button">
        <span class="like-text">${likeText}</span>
      </button>
    `)
    ele.addEventListener('click', this.changleLikeText.bind(this), false);
    if (this.el) {
      const eleParent = this.el.parentElement;
      eleParent.insertBefore(ele, this.el);
      eleParent.removeChild(this.el);
    }
    this.el = ele;
    return ele;
  }
}

var btn = new LikeButton();
document.body.append(btn.render());

