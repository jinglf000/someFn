
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
    this.el = ele;
    this.el.addEventListener('click', this.changleLikeText.bind(this), false);
    return this.el;
  }
}

var btn = new LikeButton();
document.body.append(btn.render());

console.log('runder ');