import React, { Component } from "react";
import Fight from "./Fight";
import Timer from "./Timer";
import Pickaxe from "./Pickaxe";
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
        armor: 0,
        name: "Procrasterminator",
        damage: 2,
        experience: 100,
        defeated: false
      },
      hero: {
        health: 10,
        armor: 0,
        damage: 1
      },
      heroHasArrived: false,
      fightStarted: false
    };
  }
  bossDefeated = () => {
    console.log("experience", this.state.boss.experience);
    this.setState({
      boss: { ...this.state.boss, defeated: true }
    });

    this.props.updateExperience(this.state.boss.experience);
  };
  damageBoss = damage => {
    // let updatedHealth =
    //   this.state.boss.health - (this.state.boss.armor - damage);
    // console.log(updatedHealth);
    let fight = setInterval(() => {
      this.setState({
        boss: { ...this.state.boss, health: this.state.boss.health - damage }
      });
    }, 500);

    if (this.state.boss.health <= 0) {
      clearInterval(fight);
      this.bossDefeated();
      this.endRound();
    }
  };

  endRound = () => {
    // player mines, timer runs out, hero comes in, player arms hero, hero damages boss
    if (this.state.boss.health <= 0) {
      console.log("Boss Defeated");
      this.bossDefeated();
    }
    this.setState({ ...this.state, gameOn: false });
  };

  handleClick = () => {
    this.setState({
      clock: 30,
      gameOn: true
    });
  };
  heroArrives = () => {
    this.setState({ ...this.state, heroHasArrived: true });
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
  clickDamage = () => {
    if (this.state.boss.health >= this.state.clickStrength) {
      console.log("boss has taken damage");
      this.setState({
        boss: {
          ...this.state.boss,
          health: this.state.boss.health - this.state.clickStrength
        }
      });
    } else {
      console.log("Boss defeated");
      this.bossDefeated();
    }
  };

  startFight = () => {
    this.setState({ ...this.state, fightStarted: true });
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
          <div className="play">
            <Button
              size="lg"
              variant="success"
              onClick={() => this.handleClick()}
            >
              {" "}
              Play{" "}
            </Button>
          </div>
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
          {!this.state.fightStarted ? (
            <div>
              <Timer heroArrives={this.heroArrives} ore={this.state.ore} />
              <h2>Ore Gathered: {this.state.ore}</h2>
              <h6>
                {" "}
                Pickaxe Strength:
                {this.state.clickStrength}{" "}
              </h6>
              <Button
                variant="outline-danger"
                size="lg"
                onClick={() => this.oreClick()}
              >
                Mine Ore!
              </Button>
            </div>
          ) : null}
          {this.state.heroHasArrived ? (
            <div>
              {!this.state.fightStarted ? (
                <Button onClick={() => this.startFight()}>Start Fight</Button>
              ) : (
                <Fight
                  boss={this.state.boss}
                  hero={this.state.hero}
                  clickDamage={this.clickDamage}
                  endRound={this.endRound}
                />
              )}
            </div>
          ) : null}
        </div>
      );
    }
  }
}
