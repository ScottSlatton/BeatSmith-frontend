import React, { Component } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

export default class Boss extends Component {
  render() {
    const now = this.props.boss.health;
    const hPercent = (now / 100) * now;
    console.log(hPercent);
    const progressInstance = (
      <ProgressBar animated variant="danger" now={now} label={`${now}`} />
    );

    return (
      <div>
        <div className="health">{progressInstance}</div>
        <div className="boss" onClick={() => this.props.takeDamage()} />
        <p>{this.props.boss.name}</p>
      </div>
    );
  }
}
