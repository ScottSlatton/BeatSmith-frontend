import React, { Component } from "react";
import Game from "./Game";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Game />
      </div>
    );
  }
}
