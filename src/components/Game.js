import React, { Component } from "react";
import Event from "./Event";
import Boss from "./Boss";
import Timer from "./Timer";
import Pickaxe from "./Pickaxe";
import ProgressBar from "react-bootstrap/ProgressBar";

import Button from "react-bootstrap/Button";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clock: 30,
      ore: 0,
      clickStrength: 1,
      gameOn: false,
      boss: {
        health: 100,
        name: "Procrasterminator",
        experience: 100,
        defeated: false
      }
    };
  }
  bossDefeated = () => {
    console.log(this.state.boss.experience);
    this.setState({
      boss: { defeated: true }
    });

    this.props.updateExperience(this.state.boss.experience);
  };

  endRound = () => {
    this.setState({ gameOn: false });
  };

  handleClick = () => {
    this.setState({
      clock: 30,
      gameOn: true
    });
  };
  oreClick = () => {
    this.setState({
      ore: this.state.ore + this.state.clickStrength
    });
  };

  setBoss = (name, health) => {
    this.setState({ boss: { name, health } });
  };
  getBoss = userLevel => {
    //fetch a boss from backend based on user level
  };
  takeDamage = () => {
    console.log("boss has taken damage");
    if (this.state.boss.health >= this.state.clickStrength) {
      this.setState({
        boss: {
          ...this.state.boss,
          health: this.state.boss.health - this.state.clickStrength
        }
      });
    } else {
      this.bossDefeated();
    }
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
      //game is not playing
      return (
        <div>
          <h2>Ore Gathered: {this.state.ore}</h2>
          <h6> Pickaxe Strength: {this.state.clickStrength} </h6>
          <Button variant="outline-danger" onClick={() => this.handleClick()}>
            {" "}
            Play{" "}
          </Button>
          <Pickaxe
            ore={this.state.ore}
            upgradeAxe={this.upgradeAxe}
            state={this.props.state}
            clickStrength={this.state.clickStrength}
          />
        </div>
      );
    } else {
      //game is playing
      return (
        <div>
          <Timer endRound={this.endRound} ore={this.state.ore} />
          <h2>Ore Gathered: {this.state.ore}</h2>
          <h6>
            {" "}
            Pickaxe Strength:
            {this.state.clickStrength}{" "}
          </h6>
          <Button variant="outline-danger" onClick={() => this.oreClick()}>
            Mine Ore!
          </Button>
          {!this.state.boss.defeated ? (
            <Boss boss={this.state.boss} takeDamage={() => this.takeDamage()} />
          ) : null}
        </div>
      );
    }
  }
}
