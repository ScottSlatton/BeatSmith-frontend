import React, { Component } from "react";
import Fight from "./Fight";
import Timer from "./Timer";
import Pickaxe from "./Pickaxe";
import Mine from "./Mine";
import Save from "./Save";
import Button from "react-bootstrap/Button";
import CraftContainer from "./CraftContainer";
import { toast } from "react-toastify";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clock: 30,
      combo: 0,
      ore: 0,
      oreTapped: false,
      click_strength: 1,
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
          name: "Shield Upgrade",
          type: "shield",
          armor: 1,
          cost: 10,
          level: 1
        },
        {
          name: "Sword Upgrade",
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

  monsterAttack = () => {
    if (this.state.hero.health >= 0) {
      let armorCheck = this.state.monster.damage - this.state.hero.armor;
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

      this.heroDefeated();
    }
  };

  monsterDefeated = () => {

    this.setState({
      ...this.state,
      monster: { ...this.state.monster, defeated: true }
    });

    this.props.autoSave(this.state.monster.experience, this.state.ore, this.state.click_strength);
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
    const notify = () => toast(`${craft.name} Bought!`);
    notify()
    // add a toast notification
  };

  clickDamage = ev => {
    if (this.state.monster.health > 0) {

      this.setState({
        monster: {
          ...this.state.monster,
          health: this.state.monster.health - this.state.click_strength
        }
      });
    } else {

      ev.target.className = "monster-defeated";
      this.monsterDefeated();
    }
  };

  componentDidMount() {
    if (!this.state.monster) {
      this.getMonster();
    }
  }

  endRound = () => {
    // player mines, timer runs out, hero comes in, player arms hero, hero damages monster, monster kills player
    // ba-da-bing, ba-da-boom
    if (this.state.monster.health <= 0) {

      this.monsterDefeated();
      //fetch a new monster
      this.getmonster();
    } else if (this.state.hero.health <= 0) {

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
    if (this.state.monster.health > 0) {

      let armorCheck = this.state.hero.damage - this.state.monster.armor;
      if (armorCheck <= 0) {
        return;
      }
      this.setState({
        ...this.state,
        monster: {
          ...this.state.monster,
          health: this.state.monster.health - armorCheck
        }
      });
    } else {

      this.endRound();
    }
  };

  heroDefeated = () => {
    this.setState({
      ...this.state,
      hero: { ...this.state.hero, defeated: true }
    });
  };

  oreClick = score => {

    if (score === 5) {
      let ore = 5;
      let comboCounter = this.updateCombo();

      this.setState({
        ...this.state,
        combo: comboCounter,
        ore: this.state.ore + ore + this.state.click_strength * comboCounter,
        oreTapped: true
      });
    } else {
      this.setState({
        ...this.state,
        combo: 0,
        ore: this.state.ore + this.state.click_strength,
        oreTapped: true
      });
    }
  };

  setMonster = level => {
    let randMonster = level.monsters[Math.floor(Math.random() * level.monsters.length)];
    this.setState({
      ...this.state,
      monster: randMonster
    })

  };

  getMonster = () => {
    //fetch a monster from backend based on user level
    fetch(`https://beatsmith-api.herokuapp.com/api/v1/levels/${this.props.state.user.level}`)
      .then(res => res.json())
      .then(level => {
        this.setMonster(level)
        this.setState({
          ...this.state, monster: { ...this.state.monster, defeated: false }
        })
      });
  };

  respawnOre = () => {
    this.setState({
      ...this.state,
      oreTapped: false
    });
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
    if (this.state.monster || this.state.monster.defeated === false) {
      this.setState({
        ...this.state,
        fightStarted: true,
        combo: 0
      });
    }
  };
  updateCombo = () => {
    return this.state.combo + 1;
  };

  upgradeAxe = multiplier => {
    this.setState({
      ...this.state,
      ore: this.state.ore - this.state.pickaxeCost * multiplier,
      click_strength: this.state.click_strength + multiplier,
      pickaxeCost: this.state.pickaxeCost + 10 * multiplier
    });
  };

  render() {
    if (!this.state.gameOn) {
      //game is not playing
      return (
        <div>
          <h2>Ore Gathered: {this.state.ore}</h2>
          <h6> Pickaxe Strength: {this.state.click_strength} </h6>
          <div className="play">
            <Button
              size="lg"
              variant="success"
              onClick={() => this.handleClick()}
            >
              {" "}
              Play{" "}
            </Button>
            {this.props.state.isLoggedIn ? (
              <Save state={this.props.state} />
            ) : null}
          </div>
          <Pickaxe
            ore={this.state.ore}
            upgradeAxe={this.upgradeAxe}
            state={this.props.state}
            click_strength={this.state.click_strength}
            cost={this.state.pickaxeCost}
          />

        </div>
      );
    } else {
      //game is playing
      return (
        <div>
          <div>
            {!this.state.heroHasArrived ? `Combo: ${this.state.combo}` : null}
          </div>
          {!this.state.fightStarted && !this.state.heroHasArrived ? (
            <div>
              <Timer heroArrives={this.heroArrives} ore={this.state.ore} />
              <h2>Ore Gathered: {this.state.ore}</h2>
              <h6>
                {" "}
                Pickaxe Strength:
                {this.state.click_strength}{" "}
              </h6>
              {this.state.oreTapped ? null : (
                <Mine
                  clearOre={this.clearOre}
                  respawnOre={this.respawnOre}
                  oreClick={this.oreClick}
                />
              )}{" "}

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
                  <div>
                    <Fight
                      monster={this.state.monster}
                      hero={this.state.hero}
                      monsterAttack={this.monsterAttack}
                      heroAttack={this.heroAttack}
                      clickDamage={this.clickDamage}
                      endRound={this.endRound}
                    />

                  </div>
                )}
            </div>
          ) : null}
        </div>
      );
    }
  }
}
