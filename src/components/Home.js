import React, { Component } from "react";
import Game from "./Game";
import "../App.css";
import ProgressBar from "react-bootstrap/ProgressBar";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <ProgressBar
          animated
          now={this.props.state.user.experience}
          label={`Experience:${this.props.state.user.experience} `}
        />
        <div className="App-header">
          <Game
            state={this.props.state}
            updateExperience={this.props.updateExperience}
          />
        </div>
      </div>
    );
  }
}
