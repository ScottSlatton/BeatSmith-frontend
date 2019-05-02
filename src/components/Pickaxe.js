import React, { Component } from "react";
import Button from "react-bootstrap/Button";

export default class Pickaxe extends Component {
  constructor(props) {
    super(props);
    this.test = this.props.clickStrength;
    this.state = { cost: this.test * 10, multiplier: 1 };
  }

  // setCost = () => {
  //   this.setState
  // }

  // componentWillUnmount() {
  //   // authenticate
  //   fetch(`http://localhost:3000/api/v1/users/${this.props.state.user.id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("token")}`
  //     },
  //     body: JSON.stringify({
  //       user: {
  //         score: this.props.ore
  //       }
  //     })
  //   });
  // }

  switchMultiplier = mult => {
    switch (mult) {
      case 1:
        this.setState({ multiplier: 3 });

        break;
      case 3:
        this.setState({ multiplier: 10 });
        break;
      case 10:
        this.setState({ multiplier: "max" });
        break;
      case "max":
        this.setState({
          multiplier: 1
        });
        break;
      default:
        this.setState({ multiplier: 1 });
    }
  };

  canAfford = () => {
    if (this.state.multiplier === "max") {
      if (Math.floor(this.props.ore / this.state.cost) > 0) {
        return true;
      }
    }

    if (this.props.ore >= this.state.cost * this.state.multiplier) {
      return true;
    } else {
      return false;
    }
  };

  polyUpgradeAxe = () => {
    this.setState({ cost: (this.test += 1) * 10 });
    let newCost = (this.test += 1 * 10);
    console.log(this.state.cost);
    this.props.upgradeAxe(newCost, this.state.multiplier);
  };

  render() {
    if (this.canAfford()) {
      return (
        <div>
          <Button onClick={() => this.polyUpgradeAxe()}>Upgrade Pickaxe</Button>
          <Button
            variant="outline-primary"
            onClick={() => this.switchMultiplier(this.state.multiplier)}
          >
            {this.state.multiplier === "max"
              ? "Max"
              : ` x${this.state.multiplier}`}
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <Button variant="outline-danger">Upgrade Pickaxe</Button>

          <Button
            variant="outline-warning"
            onClick={() => this.switchMultiplier(this.state.multiplier)}
          >
            {this.state.multiplier === "max"
              ? "Max"
              : ` x${this.state.multiplier}`}
          </Button>
          <p>Not enough ore!</p>
        </div>
      );
    }
  }
}
