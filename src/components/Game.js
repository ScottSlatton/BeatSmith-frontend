import React, { Component } from "react";
import Fight from "./Fight";
import Timer from "./Timer";
import Pickaxe from "./Pickaxe";
import Mine from "./Mine";
import Button from "react-bootstrap/Button";
import CraftContainer from "./CraftContainer";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clock: 30,
      ore: 0,
      oreTapped: false,
      clickStrength: 1,
      gameOn: false,
      hero: {
        name: "Stan",
        health: 100,
        armor: 0,
        damage: 1,
        defeated: false
      },
      crafts: [
        {
          name: "Wooden Shield",
          type: "shield",
          armor: 1,
          cost: 10,
          level: 1
        },
        {
          name: "Wooden Sword",
          type: "weapon",
          damage: 1,
          cost: 10,
          level: 1
        }
      ],

      heroHasArrived: false,
      fightStarted: false,
      pickaxeCost: 10
    };
  }

  bossAttack = () => {
    if (this.state.hero.health >= 0) {
      console.log("Boss strikes the hero!");
      let armorCheck = this.state.boss.damage - this.state.hero.armor;
      if (armorCheck <= 0) {
        return;
      }
      this.setState({
        ...this.state,
        hero: {
          ...this.state.hero,
          health: this.state.hero.health - armorCheck
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
      if (craft.armor >= 0) {
        this.setState({
          ...this.state,
          ore: this.state.ore - craft.cost,
          hero: {
            ...this.state.hero,
            armor: this.state.hero.armor + craft.armor
          }
        });
      } else if (craft.damage >= 0) {
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

  clickDamage = ev => {
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
      ev.target.className = "boss-defeated";
      this.bossDefeated();
    }
  };

  componentDidMount() {
    if (!this.state.boss) {
      this.getBoss();
    }
  }

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

  endRound = () => {
    // player mines, timer runs out, hero comes in, player arms hero, hero damages boss, boss kills player
    // ba-da-bing, ba-da-boom
    if (this.state.boss.health <= 0) {
      console.log("Boss Defeated");
      this.bossDefeated();
      //fetch a new monster
      this.getNewMonster();
    } else if (this.state.hero.health <= 0) {
      console.log("Hero Defeated");
      this.heroDefeated();
      //fetch a new hero
      this.spawnNewHero();
    }
    this.setState({
      ...this.state,
      gameOn: false,
      heroHasArrived: false,
      fightStarted: false
    });
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
    if (this.state.boss.health >= 0) {
      console.log("Hero strikes the monster!");
      let armorCheck = this.state.hero.damage - this.state.boss.armor;
      if (armorCheck <= 0) {
        return;
      }
      this.setState({
        ...this.state,
        boss: {
          ...this.state.boss,
          health: this.state.boss.health - armorCheck
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

  oreClick = score => {
    this.setState({
      ...this.state,
      ore: this.state.ore + score + this.state.clickStrength,
      oreTapped: true
    });
  };

  setBoss = bosses => {
    bosses.map(boss =>
      this.setState({
        ...this.state,
        boss: {
          name: boss.name,
          armor: boss.armor,
          health: boss.health,
          experience: boss.experience,
          damage: boss.damage,
          defeated: false
        }
      })
    );
  };

  getBoss = () => {
    //fetch a boss from backend based on user level
    fetch("http://localhost:3000/api/v1/bosses")
      .then(res => res.json())
      .then(bosses => this.setBoss(bosses));
  };

  spawnNewHero = () => {
    this.setState({
      ...this.state,
      hero: {
        health: 100,
        armor: 0,
        name: "Bran",
        damage: 1,
        defeated: false
      }
    });
  };

  startFight = () => {
    if (this.state.boss || this.state.boss.defeated === false) {
      this.setState({
        ...this.state,
        fightStarted: true
      });
    }
  };

  upgradeAxe = multiplier => {
    this.setState({
      ...this.state,
      ore: this.state.ore - this.state.pickaxeCost * multiplier,
      clickStrength: this.state.clickStrength + multiplier,
      pickaxeCost: this.state.pickaxeCost + 10 * multiplier
    });
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
            cost={this.state.pickaxeCost}
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
              <Mine oreClick={this.oreClick} />
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
