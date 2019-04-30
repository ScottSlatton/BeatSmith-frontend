import React, { Component } from "react";

export default class Craft extends Component {
  constructor(props) {
    super(props);
    this.state = { cost: 10, multiplier: 1 };
  }

  switchMultiplier = mult => {
    switch (mult) {
      case 1:
        this.setState({ multiplier: 3 });
        break;
      case 3:
        this.setState({ multiplier: 10 });
        break;
      case 10:
        this.setState({ multiplier: 1 });
        break;
      default:
        this.setState({ multiplier: 1 });
    }
  };
  buyMultiCraft = () => {
    let numCanBuy = Math.floor(
      this.props.ore / (this.state.cost * this.state.multiplier)
    );
    this.props.buyCraft(this.state.cost, numCanBuy);
  };

  render() {
    if (this.props.ore >= this.state.cost * this.state.multiplier) {
      return (
        <div>
          <button onClick={() => this.buyMultiCraft()}>Craft Weapon</button>
          <button onClick={() => this.switchMultiplier(this.state.multiplier)}>
            x{this.state.multiplier}
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button>Craft Weapon</button>

          <button onClick={() => this.switchMultiplier(this.state.multiplier)}>
            x{this.state.multiplier}
          </button>
          <p>Not enough ore!</p>
        </div>
      );
    }
  }
}
