import React, { Component } from "react";
import Event from "./Event";
import Boss from "./Boss";
import Timer from "./Timer";
import Pickaxe from "./Pickaxe";

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
      gameOn: true
    });
  };
  oreClick = () => {
    this.setState({ ore: this.state.ore + this.state.clickStrength });
  };

  endRound = () => {
    this.setState({ gameOn: false });
  };

  upgradeAxe = (cost, multiplier) => {
    if (multiplier === "max") {
      let max = Math.floor(this.state.ore / cost);
      this.setState({
        ore: this.state.ore - cost * max,
        clickStrength: this.state.clickStrength + 1 * max
      });
    } else {
      this.setState({
        ore: this.state.ore - cost * multiplier,
        clickStrength: this.state.clickStrength + 1 * multiplier
      });
    }
  };

  render() {
    if (!this.state.gameOn) {
      return (
        <div>
          <h2>Ore Gathered: {this.state.ore}</h2>
          <h6> Weapons Made: {this.state.clickStrength} </h6>
          <button onClick={() => this.handleClick()}> Play </button>

          <Pickaxe
            ore={this.state.ore}
            upgradeAxe={this.upgradeAxe}
            state={this.props.state}
          />
          <Boss />
        </div>
      );
    } else {
      return (
        <div>
          <Timer endRound={this.endRound} ore={this.state.ore} />
          <h2>Ore Gathered: {this.state.ore}</h2>
          <h6> Pickaxe Strength:{this.state.clickStrength} </h6>
          <button onClick={() => this.oreClick()}>Mine Ore!</button>
          <Boss />
        </div>
      );
    }
  }
}
