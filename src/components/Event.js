import React, { Component } from "react";

export default class Event extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: true, number: 0, score: 1, size: this.props.size };
  }

  componentDidMount() {
    //start a loop, it increments to 100, the score should be updated depending on the size of the event
    //and the time it took the player to click
    this.interval = setInterval(() => {
      if (this.state.number <= 20) {
        this.setState({
          number: this.state.number + 2,
          score: this.state.score + 1
        });
      } else {
        this.setState({ number: 0, score: 0 });
        clearInterval(this.interval);
        this.setState({ counter: false });
      }
    }, 50);
  }

  /*
  when instantiated, circle needs a value given
 that value is then used to determine when the best time to click the div is.
 if the div is clicked outside of that range, then the player will recieve less resources
 
 */

  handleClick = () => {
    //stop the loop, return the score, destroy the component
    clearInterval(this.interval);
    console.log("You Gathered: ", this.state.score, "Ore.");
    this.setState({ score: 0 });
    this.setState({ counter: false });
  };

  render() {
    if (this.state.counter) {
      if (this.state.size === "lg") {
        return (
          <div
            className="circleBase type3 large hitbox"
            onClick={() => this.handleClick()}
          />
        );
      } else if (this.state.size === "med") {
        return (
          <div
            className="circleBase type1 medium hitbox"
            onClick={() => this.handleClick()}
          />
        );
      } else if (this.state.size === "sm") {
        return (
          <div
            className="circleBase type2 small hitbox"
            onClick={() => this.handleClick()}
          />
        );
      }
    }
    return null;
  }
}
