import React, { Component } from "react";
import Event from "./Event";
import Boss from "./Boss";
import Timer from "./Timer";
import Craft from "./Craft";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clock: 30,
      ore: 0,
      clickStrength: 1,
      gameOn: false
    };
  }

  handleClick = () => {
    this.setState({
      clock: 30,
      //   ore: localStorage.getItem("ore"),
      gameOn: true
    });
  };
  oreClick = () => {
    this.setState({ ore: this.state.ore + this.state.clickStrength });
  };

  endRound = () => {
    this.setState({ gameOn: false });
  };

  buyCraft = (cost, number) => {
    this.setState({
      ore: this.state.ore - cost,
      clickStrength: this.state.clickStrength + number
    });
  };

  render() {
    if (!this.state.gameOn) {
      return (
        <div>
          <h2>Ore Gathered: {this.state.ore}</h2>
          <h6> Weapons Made:{this.state.clickStrength} </h6>
          <button
            onTouch={() => this.oreClick()}
            onClick={() => this.handleClick()}
          >
            {" "}
            Play{" "}
          </button>

          <Craft ore={this.state.ore} buyCraft={this.buyCraft} />
        </div>
      );
    } else {
      return (
        <div>
          <Timer endRound={this.endRound} ore={this.state.ore} />
          <h2>Ore Gathered: {this.state.ore}</h2>
          <h6> Weapons Made:{this.state.clickStrength} </h6>
          <button
            onTouch={() => this.oreClick()}
            onClick={() => this.oreClick()}
          >
            Mine Ore!
          </button>
        </div>
      );
    }
  }
}
