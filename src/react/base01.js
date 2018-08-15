class Timer extends React.component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0};
  }
  tick() {
    this.setSate(prevState => {
      seconds: prevState.seconds + 1
    });
  }
  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div>
        Seconds: {this.state.seconds}
      </div>
    )
  }
}

ReactDOM.render(<Timer />, mountNode);
