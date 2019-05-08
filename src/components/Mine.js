import React, { Component } from "react";
import Button from "react-bootstrap/Button";

export default class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = { score: 1, button: 0 };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 200);
  }

  tick() {
    // every tick, do something
    //
    this.updateButton(this.state.score);
    this.setState({ ...this.state, score: this.state.score + 1 });
    if (this.state.score > 5) {
      this.setState({ ...this.state, score: 1 });
    }
    console.log("score", this.state.score);
  }

  updateButton = counter => {
    if (counter <= 2) {
      this.setState({ ...this.state, button: 1 });
    } else if (counter <= 3) {
      this.setState({ ...this.state, button: 2 });
    } else if (counter <= 5) {
      this.setState({ ...this.state, button: 0 });
    } else {
      this.setState({ ...this.state, button: 0 });
    }
  };

  componentWillUnmount() {
    this.props.respawnOre();
    clearInterval(this.timerID);
  }

  render() {
    switch (this.state.button) {
      case 0:
        return (
          <Button
            variant="outline-danger"
            size="lg"
            onClick={() => this.props.oreClick(this.state.score)}
          >
            Mine!
          </Button>
        );
      case 1:
        return (
          <Button
            variant="outline-warning"
            size="lg"
            onClick={() => this.props.oreClick(this.state.score)}
          >
            Mine!
          </Button>
        );
      case 2:
        return (
          <Button
            variant="outline-success"
            size="lg"
            onClick={() => this.props.oreClick(this.state.score)}
          >
            Mine!
          </Button>
        );
      default:
        return (
          <Button
            variant="outline-info"
            size="lg"
            onClick={() => this.props.oreClick(this.state.score)}
          >
            Mine!
          </Button>
        );
    }
  }
}
