import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Pickaxe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multiplier: 1
    };
  }

  canAfford = () => {
    let price = this.cost();
    if (this.props.ore >= price) {
      return true;
    } else {
      return false;
    }
  };

  cost = () => {
    let price = this.props.cost * this.state.multiplier;
    return price;
  };

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

  render() {
    const notify = () => toast("Not Enough Ore!");

    if (this.canAfford()) {
      return (
        <div>
          <Button onClick={() => this.props.upgradeAxe(this.state.multiplier)}>
            Upgrade Pickaxe
          </Button>
          <Button variant="outline-warning" disabled>
            Cost {this.props.click_strength * 10 * this.state.multiplier}
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => this.switchMultiplier(this.state.multiplier)}
          >
            {`x${this.state.multiplier}`}
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <Button variant="outline-danger" onClick={notify}>
            Upgrade Pickaxe
          </Button>
          <Button variant="outline-warning" disabled>
            Cost {this.props.click_strength * 10 * this.state.multiplier}
          </Button>
          <Button
            variant="outline-warning"
            onClick={() => this.switchMultiplier(this.state.multiplier)}
          >
            {`x${this.state.multiplier}`}
          </Button>{" "}

        </div>
      );
    }
  }
}
