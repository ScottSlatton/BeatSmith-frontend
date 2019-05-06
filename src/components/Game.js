import React, { Component } from "react";
import Fight from "./Fight";
import Timer from "./Timer";
import Pickaxe from "./Pickaxe";
import Button from "react-bootstrap/Button";
import CraftContainer from "./CraftContainer";

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
        name: "Stan",
        health: 100,
        armor: 0,
        damage: 1,
        defeated: false
      },
      crafts: [
        {
          name: "shield",
          armor: 1,
          cost: 10
        },
        {
          name: "sword",
          damage: 1,
          cost: 10
        }
      ],

      heroHasArrived: false,
      fightStarted: false
    };
  }
  bossAttack = () => {
    if (this.state.hero.health > 0) {
      console.log("Boss strikes the hero!");
      this.setState({
        ...this.state,
        hero: {
          ...this.state.hero,
          health: this.state.hero.health - this.state.boss.damage
        }
      });
    } else {
      console.log("Hero defeated");
      this.heroDefeated();
    }
  };

  bossDefeated = () => {
    console.log("experience", this.state.boss.experience);
    this.setState({
      ...this.state,
      boss: { ...this.state.boss, defeated: true }
    });

    this.props.updateExperience(this.state.boss.experience);
  };

  buy = craft => {
    if (craft.cost <= this.state.ore) {
      if (craft.armor) {
        this.setState({
          ...this.state,
          ore: this.state.ore - craft.cost,
          hero: {
            ...this.state.hero,
            armor: this.state.hero.armor + craft.armor
          }
        });
      } else if (craft.damage) {
        this.setState({
          ...this.state,
          ore: this.state.ore - craft.cost,
          hero: {
            ...this.state.hero,
            damage: this.state.hero.damage + craft.damage
          }
        });
      }
    }
    // add a toast notification
  };

  getNewMonster = () => {
    // this is so fetch
    this.setState({
      ...this.state,
      boss: {
        health: 100,
        armor: 0,
        name: "The Deux",
        damage: 2,
        experience: 100,
        defeated: false
      }
    });
  };

  damageBoss = damage => {
    // let updatedHealth =
    //   this.state.boss.health - (this.state.boss.armor - damage);
    // console.log(updatedHealth);
    let fight = setInterval(() => {
      this.setState({
        boss: {
          ...this.state.boss,
          health: this.state.boss.health - damage
        }
      });
    }, 500);

    if (this.state.boss.health <= 0) {
      clearInterval(fight);
      this.bossDefeated();
      this.endRound();
    }
  };

  endRound = () => {
    // player mines, timer runs out, hero comes in, player arms hero, hero damages boss, boss kills player
    // ba-da-bing, ba-da-boom
    if (this.state.boss.health <= 0) {
      console.log("Boss Defeated");
      this.bossDefeated();
    }
    this.setState({
      ...this.state,
      gameOn: false,
      heroHasArrived: false,
      fightStarted: false
    });
    //fetch a new monster
    this.getNewMonster();
  };

  handleClick = () => {
    this.setState({
      clock: 30,
      gameOn: true
    });
  };

  heroArrives = () => {
    this.setState({
      ...this.state,
      heroHasArrived: true
    });
  };

  heroAttack = () => {
    if (this.state.boss.health > 0) {
      console.log("Hero strikes the monster!");
      this.setState({
        ...this.state,
        boss: {
          ...this.state.boss,
          health: this.state.boss.health - this.state.hero.damage
        }
      });
    } else {
      console.log("Boss defeated");
      this.bossDefeated();
    }
  };

  heroDefeated = () => {
    this.setState({
      ...this.state,
      hero: { ...this.state.hero, defeated: true }
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

  clickDamage = () => {
    if (this.state.boss.health > 0) {
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
    this.setState({
      ...this.state,
      fightStarted: true
    });
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
          {!this.state.fightStarted && !this.state.heroHasArrived ? (
            <div>
              <Timer heroArrives={this.heroArrives} ore={this.state.ore} />
              <h2>Ore Gathered: {this.state.ore}</h2>
              <h6>
                {" "}
                Pickaxe Strength:
                {this.state.clickStrength}{" "}
              </h6>
              <Button
                variant="outline-info"
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
                //outfitting stage
                <div>
                  <h1> A Hero has arrived! </h1>
                  <h2> Craft Weapons and Armor to defeat the Monster!</h2>
                  <p>{`Hero Armor: ${this.state.hero.armor}`}</p>
                  <p>{`Hero Attack: ${this.state.hero.damage}`}</p>
                  <h2>Ore Gathered: {this.state.ore}</h2>
                  <CraftContainer crafts={this.state.crafts} buy={this.buy} />

                  <Button onClick={() => this.startFight()}>Start Fight</Button>
                </div>
              ) : (
                <Fight
                  boss={this.state.boss}
                  hero={this.state.hero}
                  bossAttack={this.bossAttack}
                  heroAttack={this.heroAttack}
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
