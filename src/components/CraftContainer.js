import React, { Component } from "react";
import Craft from "./Craft";

export default class CraftContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this.props.crafts.map(craft => {
          return <Craft craft={craft} />;
        })}
      </div>
    );
  }
}
