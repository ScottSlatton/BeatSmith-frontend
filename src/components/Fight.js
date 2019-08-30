import React, { Component } from "react";
import Monster from "./Monster";
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
    if (this.props.hero.health > 0 && this.props.monster.health > 0) {
      //every tick, do something
      this.props.heroAttack();
      this.props.monsterAttack();
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
          monster={this.props.monster}
          hero={this.props.hero}
        />
        <Monster
          monster={this.props.monster}
          hero={this.props.hero}
          clickDamage={this.props.clickDamage}
        />
      </div>
    );
  }
}
