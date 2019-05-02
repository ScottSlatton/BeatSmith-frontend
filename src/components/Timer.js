import React, { Component } from "react";

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { clock: 5 };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    if (this.state.clock > 0) {
      //every tick, do something
      this.setState({
        clock: this.state.clock - 1
      });
    } else {
      localStorage.setItem("ore", this.props.ore);
      this.props.heroArrives();
    }
  }

  render() {
    return (
      <div>
        <h2>Hero Arrives In: {this.state.clock}</h2>
      </div>
    );
  }
}
