import React, { Component } from "react";
import Boss from "./Boss";
import Hero from "./Hero";

export default class Fight extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 500);
  }
  tick() {
    if (this.props.hero.health > 0 && this.props.boss.health > 0) {
      //every tick, do something
      this.props.heroAttack();
      this.props.bossAttack();
    } else {
      //end fight
      this.props.endRound();
    }
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  render() {
    return (
      <div>
        {" "}
        <Hero
          damage={this.damage}
          boss={this.props.boss}
          hero={this.props.hero}
        />
        <Boss
          boss={this.props.boss}
          hero={this.props.hero}
          clickDamage={this.props.clickDamage}
        />
      </div>
    );
  }
}
